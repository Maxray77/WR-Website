/**
 * Server-side layout for the embedded Sanity Studio.
 * Exports the metadata + viewport that next-sanity provides.
 */
export { metadata, viewport } from "next-sanity/studio";

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
