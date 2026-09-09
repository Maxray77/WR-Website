import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { siteUrl } from "@/lib/utils";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: "All That Breathes — Screenings | Wildlife Rescue",
    template: "%s | All That Breathes Screenings",
  },
  description:
    "Reserve a free seat at a screening of the Oscar-nominated documentary All That Breathes, hosted by Wildlife Rescue, Delhi.",
  openGraph: {
    type: "website",
    siteName: "All That Breathes Screenings",
    title: "All That Breathes — Screenings",
    description:
      "Reserve a free seat at a screening of the Oscar-nominated documentary All That Breathes.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
