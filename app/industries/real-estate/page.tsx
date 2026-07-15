import type { Metadata } from "next";
import RealEstatePage from "@/components/industries/RealEstatePage";

export const metadata: Metadata = {
  title: "Real Estate — VenturezCo",
  description: "We capture, qualify, and follow up with every lead instantly — so you never miss another showing, listing, or referral.",
};

export default function Page() {
  return <RealEstatePage />;
}
