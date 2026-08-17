"use client";

import { useEffect, useState } from "react";

const MIN_VISIBLE_MS = 900;
const FADE_MS = 560;

/** Branded full-screen splash shown while the page's initial assets and
 * client-side animation systems get a chance to initialize — ported from
 * the standalone loader.html handoff. Progress is a simulated ramp (there's
 * no single reliable "everything is ready" signal for a page this
 * animation-heavy), but the loader only actually finishes once ALL of the
 * following are true: the ramp reached 100%, the browser `load` event
 * fired, and web fonts are ready. Finishing on `load` alone (or on
 * `document.readyState === "complete"`) fires almost immediately in an
 * already-hydrated SPA — well before hydration-gated pieces like the
 * dynamically-imported hero blob canvas or scroll-reveal observers have
 * mounted — which was causing the loader to vanish early and flash an
 * unfinished-looking page underneath. Renders in the initial server HTML so
 * it's visible before hydration, then animates out and unmounts once every
 * condition is satisfied. */
export default function PageLoader() {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);
  const [removed, setRemoved] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const start = Date.now();
    let finished = false;
    let timer: ReturnType<typeof setInterval> | undefined;
    // Reduced-motion visitors skip the ramp/font wait entirely — the site's
    // own animations are already disabled for them, so there's nothing for
    // the loader to protect against.
    let rampDone = reduce;
    let pageLoaded = false;
    let fontsReady = reduce;

    function maybeFinish() {
      if (finished || !rampDone || !pageLoaded || !fontsReady) return;
      finished = true;
      if (timer) clearInterval(timer);
      setProgress(100);
      const wait = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start)) + 320;
      setTimeout(() => {
        setFading(true);
        setTimeout(() => setRemoved(true), FADE_MS);
      }, wait);
    }

    if (!reduce) {
      timer = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) return p;
          const step = p < 70 ? 6 + Math.random() * 10 : 2 + Math.random() * 5;
          const next = p + step;
          if (next >= 100) {
            rampDone = true;
            maybeFinish();
            return 100;
          }
          return next;
        });
      }, 130);
    }

    function handleLoad() {
      pageLoaded = true;
      maybeFinish();
    }
    if (document.readyState === "complete") handleLoad();
    else window.addEventListener("load", handleLoad);

    if (typeof document.fonts !== "undefined") {
      document.fonts.ready.then(() => {
        fontsReady = true;
        maybeFinish();
      });
    } else {
      fontsReady = true;
    }

    // maybeFinish() sets progress to 100 itself once every condition is
    // met (including reduced-motion, which starts with rampDone/fontsReady
    // already true) — no separate setState call needed here.
    if (reduce) maybeFinish();

    return () => {
      if (timer) clearInterval(timer);
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  if (removed) return null;

  const shown = Math.round(Math.min(100, Math.max(0, progress)));

  return (
    <div
      id="vzpl-loader"
      className={fading ? "vzpl-done" : undefined}
      role="progressbar"
      aria-label="Loading page"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={shown}
    >
      <div className="vzpl-ring-wrap">
        <div className="vzpl-ring" />
        <div className="vzpl-ring-track" />
        <svg className="vzpl-mark" width="46" height="46" viewBox="0 0 26 26" fill="none">
          <path
            d="M4 19 L10 12 L14.5 15 L22 6"
            stroke="#3B2FE0"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="30"
          />
          <circle cx="22" cy="6" r="2.2" fill="#22D3EE" />
        </svg>
      </div>
      <div className="vzpl-word">
        Venturez<span>Co</span>
      </div>
      <div className="vzpl-bar">
        <div className="vzpl-bar-fill" style={{ width: `${shown}%` }} />
      </div>
      <div className="vzpl-label">{fading ? "READY" : `LOADING ${shown}%`}</div>
    </div>
  );
}
