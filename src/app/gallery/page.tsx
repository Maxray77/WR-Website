import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import GalleryClient from "./GalleryClient";

export const metadata: Metadata = pageMetadata.gallery;

export default function GalleryPage() {
  return <GalleryClient />;
}
