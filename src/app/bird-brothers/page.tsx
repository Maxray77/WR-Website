import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import BirdBrothersClient from "./BirdBrothersClient";

export const metadata: Metadata = pageMetadata.birdBrothers;

export default function BirdBrothersPage() {
  return <BirdBrothersClient />;
}
