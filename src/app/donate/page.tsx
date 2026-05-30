import { Suspense } from "react";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import DonateClient from "./DonateClient";

export const metadata: Metadata = pageMetadata.donate;

export default function DonatePage() {
  return (
    <Suspense>
      <DonateClient />
    </Suspense>
  );
}
