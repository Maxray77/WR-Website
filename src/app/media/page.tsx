import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import MediaClient from "./MediaClient";

export const metadata: Metadata = pageMetadata.media;

export default function MediaPage() {
  return <MediaClient />;
}
