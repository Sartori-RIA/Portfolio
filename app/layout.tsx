import type {Metadata} from "next";
import {Roboto} from "next/font/google";
import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";
import {Analytics} from "@vercel/analytics/next";
import {SpeedInsights} from "@vercel/speed-insights/next";
import {PersonJsonLd} from "@/app/components/PersonJsonLd";
import {SiteNav} from "@/app/components/ui/SiteNav";
import {site} from "@/content/profile";

config.autoAddCss = false;

const roboto = Roboto({
  weight: "200",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s · ${site.title}`,
  },
  description: site.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: site.url,
    siteName: site.title,
    title: site.title,
    description: site.description,
    images: [{url: "/images/me.jpeg", width: 448, height: 448, alt: "Lucas Sartori"}],
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    images: ["/images/me.jpeg"],
  },
  icons: {
    icon: [
      {url: "/icon.svg", type: "image/svg+xml"},
      {url: "/favicons/icon-16x16.png", sizes: "16x16", type: "image/png"},
      {url: "/favicons/icon-32x32.png", sizes: "32x32", type: "image/png"},
      {url: "/favicons/icon-48x48.png", sizes: "48x48", type: "image/png"},
      {url: "/favicons/icon-256x256.png", sizes: "256x256", type: "image/png"},
      {url: "/favicons/icon-512x512.png", sizes: "512x512", type: "image/png"},
    ],
    apple: "/favicons/icon-180x180.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <PersonJsonLd/>
        <SiteNav/>
        {children}
        <Analytics/>
        <SpeedInsights/>
      </body>
    </html>
  );
}
