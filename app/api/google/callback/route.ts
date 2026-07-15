import { NextResponse } from "next/server";
import { getOAuthClient, getRedirectUri } from "@/lib/googleCalendar";

// One-time setup route (see SETUP.md): Google redirects here after consent;
// exchanges the code for a refresh token and prints it so it can be copied
// into .env.local as GOOGLE_REFRESH_TOKEN. Never logs the access token
// (short-lived, not needed) — only the long-lived refresh token.
export async function GET(request: Request) {
  const code = new URL(request.url).searchParams.get("code");
  if (!code) {
    return NextResponse.json({ error: "Missing ?code from Google's redirect." }, { status: 400 });
  }

  const client = getOAuthClient(getRedirectUri());
  try {
    const { tokens } = await client.getToken(code);
    if (!tokens.refresh_token) {
      return NextResponse.json(
        {
          error:
            "Google didn't return a refresh token. This usually means the account already granted access previously — revoke access at https://myaccount.google.com/permissions for this app, then try /api/google/auth again.",
        },
        { status: 400 }
      );
    }
    console.log(`\n[google-calendar] Add this to .env.local:\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}\n`);
    return new NextResponse(
      `<pre>Connected. Copy this into .env.local, then restart the dev server:\n\nGOOGLE_REFRESH_TOKEN=${tokens.refresh_token}</pre>`,
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error("[google-calendar] Token exchange failed:", err);
    return NextResponse.json({ error: "Token exchange failed. Check server logs." }, { status: 500 });
  }
}
