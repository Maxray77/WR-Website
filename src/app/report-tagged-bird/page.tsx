import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import ReportTaggedBirdClient from "./ReportTaggedBirdClient";

export const metadata: Metadata = pageMetadata.reportTaggedBird;

export default function ReportTaggedBirdPage() {
  return <ReportTaggedBirdClient />;
}
