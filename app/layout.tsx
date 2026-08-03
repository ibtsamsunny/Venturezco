/* eslint-disable @next/next/no-page-custom-font -- Satoshi (Fontshare) isn't
   distributed via next/font/google, so it's loaded as plain <link> tags in
   the root layout head — same as the source design. */
import type { Metadata } from "next";
import "./globals.css";
import AmbientBackground from "@/components/layout/AmbientBackground";
import PageLoader from "@/components/layout/PageLoader";
import SiteHeader from "@/components/layout/SiteHeader";
import WhatsAppButton from "@/components/layout/WhatsAppButton";
import { BookingModalProvider } from "@/components/booking/BookingModalProvider";
import BookingModal from "@/components/booking/BookingModal";

export const metadata: Metadata = {
  title: "VenturezCo — Growth & Automation Systems",
  description:
    "VenturezCo builds the growth systems that attract leads, automate follow-up, lift conversions, and create predictable revenue.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@900,700,500,400&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PageLoader />
        <BookingModalProvider>
          <AmbientBackground />
          <SiteHeader />
          {children}
          <WhatsAppButton />
          <BookingModal />
        </BookingModalProvider>
      </body>
    </html>
  );
}
