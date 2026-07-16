"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { TZ_LABELS } from "@/lib/timezone";

export const TZ_OPTS = TZ_LABELS;

export const HELP_OPTS = ["Lead Generation", "Paid Advertising", "AI Automation", "CRM & Sales System", "Growth Strategy"];
export const BUDGET_OPTS = ["Under $1k", "$1k – $5k", "$5k – $15k", "$15k – $50k", "$50k+"];
export const TIMELINE_OPTS = ["Immediately", "Within 2 weeks", "This month", "Just exploring"];

export type BookingDate = { wd: string; day: number; mon: string; full: string; iso: string };

/** A candidate time-of-day slot for the currently selected date — `iso` is
 * the canonical UTC instant (the slot's real identity); display labels are
 * derived from it per the visitor's chosen timezone, never stored. */
export type BookingSlot = { iso: string; available: boolean };

export type BookingErrors = Partial<
  Record<"fullName" | "businessName" | "email" | "website" | "challenge" | "help" | "budget" | "timeline" | "slot", string>
>;

export type BookingFormValues = {
  fullName: string;
  businessName: string;
  email: string;
  website: string;
  challenge: string;
};

type BookingState = {
  bkOpen: boolean;
  bkStep: 1 | 2;
  bkDate: number | null;
  /** Selected slot's UTC ISO instant, or null if none chosen yet. */
  bkSlot: string | null;
  bkDone: boolean;
  bkHelp: string | null;
  bkBudget: string | null;
  bkTimeline: string | null;
  bkErrors: BookingErrors;
  bkTz: string;
  bkTzOpen: boolean;
  bkSubmitting: boolean;
  /** Real candidate slots for the selected date, or null before a date is
   * picked / while (re)fetching. */
  bkSlots: BookingSlot[] | null;
  bkSlotsLoading: boolean;
};

type BookingContextValue = BookingState & {
  dates: BookingDate[];
  openBooking: (e?: { preventDefault?: () => void }) => void;
  closeBooking: () => void;
  selectDate: (i: number) => void;
  selectSlot: (iso: string) => void;
  toggleTz: () => void;
  setTz: (t: string) => void;
  toStep2: () => void;
  toStep1: () => void;
  setHelp: (v: string) => void;
  setBudget: (v: string) => void;
  setTimeline: (v: string) => void;
  submit: (values: BookingFormValues) => Promise<void>;
  scrollRef: (el: HTMLElement | null) => void;
};

const BookingModalContext = createContext<BookingContextValue | null>(null);

function generateDates(): BookingDate[] {
  const wds = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const mons = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const out: BookingDate[] = [];
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 1);
  while (out.length < 8) {
    const dow = d.getDay();
    if (dow !== 0 && dow !== 6) {
      out.push({
        wd: wds[dow],
        day: d.getDate(),
        mon: mons[d.getMonth()],
        full: `${wds[dow]}, ${mons[d.getMonth()]} ${d.getDate()}`,
        iso: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`,
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export function BookingModalProvider({ children }: { children: ReactNode }) {
  const [dates] = useState<BookingDate[]>(() => generateDates());
  const scrollElRef = useRef<HTMLElement | null>(null);

  const [state, setState] = useState<BookingState>({
    bkOpen: false,
    bkStep: 1,
    bkDate: null,
    bkSlot: null,
    bkDone: false,
    bkHelp: null,
    bkBudget: null,
    bkTimeline: null,
    bkErrors: {},
    bkTz: "Eastern Time (ET)",
    bkTzOpen: false,
    bkSubmitting: false,
    bkSlots: null,
    bkSlotsLoading: false,
  });
  const stateRef = useRef(state);
  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const openBooking = useCallback((e?: { preventDefault?: () => void }) => {
    e?.preventDefault?.();
    document.body.style.overflow = "hidden";
    setState((s) => ({ ...s, bkOpen: true, bkStep: 1, bkDone: false }));
  }, []);

  const closeBooking = useCallback(() => {
    document.body.style.overflow = "";
    setState((s) => ({ ...s, bkOpen: false }));
  }, []);

  useEffect(() => {
    // Runs on first load AND on every client-side navigation that changes
    // the hash (Link navigations don't remount this provider, so a plain
    // mount-only check would miss e.g. clicking a "/#contact" link from
    // another page — this matches the source's per-page-load hash check).
    const checkHash = () => {
      const hash = (window.location.hash || "").toLowerCase();
      if (hash === "#book" || hash === "#contact") openBooking();
    };
    const t = setTimeout(checkHash, 200);
    window.addEventListener("hashchange", checkHash);
    return () => {
      clearTimeout(t);
      window.removeEventListener("hashchange", checkHash);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchGenRef = useRef(0);
  const fetchSlotsFor = useCallback((dateIso: string) => {
    const gen = ++fetchGenRef.current;
    setState((s) => ({ ...s, bkSlots: null, bkSlotsLoading: true }));
    fetch(`/api/availability?date=${dateIso}`)
      .then((res) => (res.ok ? res.json() : { slots: null }))
      .then((data: { slots: BookingSlot[] | null }) => {
        if (gen !== fetchGenRef.current) return;
        setState((s) => ({ ...s, bkSlots: data.slots, bkSlotsLoading: false }));
      })
      .catch(() => {
        if (gen !== fetchGenRef.current) return;
        setState((s) => ({ ...s, bkSlots: null, bkSlotsLoading: false }));
      });
  }, []);

  const selectDate = useCallback(
    (i: number) => {
      setState((s) => ({ ...s, bkDate: i, bkSlot: null }));
      fetchSlotsFor(dates[i].iso);
    },
    [dates, fetchSlotsFor]
  );
  const selectSlot = useCallback(
    (iso: string) => setState((s) => ({ ...s, bkSlot: iso, bkErrors: { ...s.bkErrors, slot: undefined } })),
    []
  );
  const toggleTz = useCallback(() => setState((s) => ({ ...s, bkTzOpen: !s.bkTzOpen })), []);
  const setTz = useCallback((t: string) => setState((s) => ({ ...s, bkTz: t, bkTzOpen: false })), []);

  const toStep2 = useCallback(() => {
    setState((s) => {
      if (s.bkDate == null || !s.bkSlot) return s;
      return { ...s, bkStep: 2 };
    });
    if (scrollElRef.current) scrollElRef.current.scrollTop = 0;
  }, []);

  const toStep1 = useCallback(() => setState((s) => ({ ...s, bkStep: 1 })), []);

  const setHelp = useCallback(
    (v: string) => setState((s) => ({ ...s, bkHelp: v, bkErrors: { ...s.bkErrors, help: undefined } })),
    []
  );
  const setBudget = useCallback(
    (v: string) => setState((s) => ({ ...s, bkBudget: v, bkErrors: { ...s.bkErrors, budget: undefined } })),
    []
  );
  const setTimeline = useCallback(
    (v: string) => setState((s) => ({ ...s, bkTimeline: v, bkErrors: { ...s.bkErrors, timeline: undefined } })),
    []
  );

  const submit = useCallback(
    async (values: BookingFormValues) => {
      const current = stateRef.current;
      const errs: BookingErrors = {};
      if (!values.fullName.trim()) errs.fullName = "Please enter your name";
      if (!values.businessName.trim()) errs.businessName = "Please enter your business name";
      const email = values.email.trim();
      if (!email) errs.email = "Please enter your email";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Enter a valid email";
      if (!values.website.trim()) errs.website = "Please enter your website";
      if (!values.challenge.trim()) errs.challenge = "Tell us a little about your challenge";
      if (!current.bkHelp) errs.help = "Pick one";
      if (!current.bkBudget) errs.budget = "Pick a range";
      if (!current.bkTimeline) errs.timeline = "Pick one";

      if (Object.keys(errs).length) {
        setState((s) => ({ ...s, bkErrors: errs }));
        return;
      }

      setState((s) => ({ ...s, bkErrors: {}, bkSubmitting: true }));
      const selDate = dates[current.bkDate as number];
      try {
        const res = await fetch("/api/book", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...values,
            date: selDate.full,
            slot: current.bkSlot,
            timezone: current.bkTz,
            help: current.bkHelp,
            budget: current.bkBudget,
            timeline: current.bkTimeline,
          }),
        });

        if (res.status === 409) {
          // Someone else took the slot between selection and submission —
          // send the visitor back to step 1 with a fresh availability
          // fetch instead of falsely confirming a time that isn't held.
          const data = await res.json().catch(() => ({ message: undefined }));
          setState((s) => ({
            ...s,
            bkSubmitting: false,
            bkStep: 1,
            bkSlot: null,
            bkErrors: { ...s.bkErrors, slot: data.message || "That time was just booked. Please pick another slot." },
          }));
          fetchSlotsFor(selDate.iso);
          return;
        }
      } catch {
        // Lead capture shouldn't hard-fail the user on a network hiccup —
        // the confirmation screen still shows; server-side logging/email is
        // best-effort on top of the client-validated data.
      }
      setState((s) => ({ ...s, bkSubmitting: false, bkDone: true }));
    },
    [dates, fetchSlotsFor]
  );

  const scrollRef = useCallback((el: HTMLElement | null) => {
    scrollElRef.current = el;
  }, []);

  const value = useMemo<BookingContextValue>(
    () => ({
      ...state,
      dates,
      openBooking,
      closeBooking,
      selectDate,
      selectSlot,
      toggleTz,
      setTz,
      toStep2,
      toStep1,
      setHelp,
      setBudget,
      setTimeline,
      submit,
      scrollRef,
    }),
    [state, dates, openBooking, closeBooking, selectDate, selectSlot, toggleTz, setTz, toStep2, toStep1, setHelp, setBudget, setTimeline, submit, scrollRef]
  );

  return <BookingModalContext.Provider value={value}>{children}</BookingModalContext.Provider>;
}

export function useBookingModal() {
  const ctx = useContext(BookingModalContext);
  if (!ctx) throw new Error("useBookingModal must be used within a BookingModalProvider");
  return ctx;
}
