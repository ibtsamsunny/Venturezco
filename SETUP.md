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

Without these, the booking modal shows the static time-slot list from the design and skips creating a calendar event — everything else (validation, email, storage) still works.

1. In [Google Cloud Console](https://console.cloud.google.com), create a project and enable the **Google Calendar API**.
2. Create an OAuth 2.0 Client ID (type: Web application). Add `http://localhost:3000/api/google/callback` as an authorized redirect URI (adjust the port to whatever `npm run dev` prints).
3. Add to `.env.local`:
   ```
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   GOOGLE_CALENDAR_ID=primary   # or a specific calendar's ID
   ```
4. Start the dev server and visit `/api/google/auth` once, signed in as the Google account whose calendar should be used. It redirects to Google, then back to `/api/google/callback`, which prints a refresh token to the server console.
5. Add that token to `.env.local`:
   ```
   GOOGLE_REFRESH_TOKEN=...
   ```
6. Restart the dev server. The booking modal now pulls real availability and creates a calendar event (with the lead as an attendee) on submit.
