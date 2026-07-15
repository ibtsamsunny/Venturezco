import { NextResponse } from "next/server";
import { getOAuthClient, getRedirectUri } from "@/lib/googleCalendar";

// One-time setup route (see SETUP.md): visit this in a browser, signed in
// as the Google account whose calendar should back the booking modal.
export async function GET() {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    return NextResponse.json(
      { error: "Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET in .env.local first — see SETUP.md." },
      { status: 400 }
    );
  }
  const client = getOAuthClient(getRedirectUri());
  const url = client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://www.googleapis.com/auth/calendar"],
  });
  return NextResponse.redirect(url);
}
