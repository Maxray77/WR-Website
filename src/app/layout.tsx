import type { Metadata } from "next";
import Script from "next/script";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/JsonLd";
import SkipNav from "@/components/SkipNav";
import Wingman from "@/components/Wingman";
import CookieConsent from "@/components/CookieConsent";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { siteMetadata } from "@/lib/metadata";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID;
const GA_ENABLED = !!GA_MEASUREMENT_ID && GA_MEASUREMENT_ID.startsWith("G-") && GA_MEASUREMENT_ID !== "G-XXXXXXXXXX";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Consent Mode v2 — initialise BEFORE any tracking script.
            Defaults to denied; CookieConsent component flips to granted on user accept. */}
        <Script id="consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              analytics_storage: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>

        {GA_ENABLED && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <SkipNav />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <Header />
        <main id="main-content" className="min-h-screen" role="main">{children}</main>
        <Footer />
        <Wingman />
        <CookieConsent />
        <SpeedInsights />
      </body>
    </html>
  );
}
