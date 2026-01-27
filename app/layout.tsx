import type {Metadata} from "next";
import {Roboto, Roboto_Mono} from "next/font/google";
import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const roboto = Roboto({
  weight: "200",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  weight: "300",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Sartori - Portfolio",
  description: "Lucas Sartori - Portfolio",
  icons: {
    icon: [
      { url: "/favicons/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicons/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicons/icon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicons/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/favicons/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/favicon-180x180.png",
  }
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${roboto.className} antialiased`}
    >
    {children}
    </body>
    </html>
  );
}
