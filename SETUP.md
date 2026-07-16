# Setup

The site runs fully out of the box — no accounts required. Forms validate, submit, and show a success state; submissions are logged to the server console and appended to `data/leads.jsonl` (gitignored). Add the environment variables below to `.env.local` to upgrade each piece to the real thing.

## Email notifications (contact form, booking form, newsletter signup)

Uses [Resend](https://resend.com). Without a key, notifications are logged to the console instead of sent.

```
RESEND_API_KEY=re_...
NOTIFY_EMAIL=hello@venturezco.com   # where notifications are sent
NOTIFY_FROM="VenturezCo <onboarding@resend.dev>"   # sender; onboarding@resend.dev works before you verify a domain
```

## Google Calendar (real booking availability + calendar event creation)

Without these, the booking modal falls back to showing all 7 business-hour slots as open (no busy-time filtering) and skips creating a calendar event — everything else (validation, email, storage) still works.

1. In [Google Cloud Console](https://console.cloud.google.com), create a project and enable the **Google Calendar API**.
2. Create an OAuth 2.0 Client ID (type: Web application). Add `http://localhost:3000/api/google/callback` as an authorized redirect URI (adjust the port to whatever `npm run dev` prints).
3. Add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   GOOGLE_CALENDAR_ID=primary   # or a specific calendar's ID
   GOOGLE_BUSINESS_TIMEZONE=Europe/London
   ```
4. Start the dev server and visit `/api/google/auth` once, signed in as the Google account whose calendar should be used. It redirects to Google, then back to `/api/google/callback`, which prints a refresh token to the server console.
5. Add that token to `.env.local`:
   ```
   GOOGLE_REFRESH_TOKEN=...
   ```
6. Restart the dev server. The booking modal now pulls real availability and creates a calendar event (with the lead as an attendee) on submit.

### Business timezone vs. visitor timezone

These are two different things and only one of them is configurable via env var:

- **`GOOGLE_BUSINESS_TIMEZONE`** (defaults to `Europe/London`) controls the *actual* working hours — the 7 appointment slots (9, 10, 11, 1, 2, 3, 4) are fixed points in *this* timezone, and that's what's checked against your Google Calendar for conflicts. Changing this env var moves your real business hours, not just a label. Restart the dev server after changing it.
- **The timezone dropdown in the booking modal** is visitor-facing only — it changes how the same underlying appointment slots are *displayed* (e.g. the business's 3:00 PM slot shows as "10:00 AM" to a visitor who selects Eastern Time). It never changes which instants exist or which one gets booked; the visitor is always booking the same real slot in business hours, just reading its clock time in their own zone.

Both use [IANA timezone names](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) (e.g. `Europe/London`, `America/New_York`), not fixed offsets like `GMT+1` — this is what makes daylight saving time work correctly. `Europe/London` automatically switches between GMT (winter) and BST (summer) on the UK's actual transition dates; a fixed-offset value would silently be wrong for half the year.
