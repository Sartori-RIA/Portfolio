import type {Metadata} from "next";
import {Roboto, Roboto_Mono} from "next/font/google";
import "./globals.css";

import "@fortawesome/fontawesome-svg-core/styles.css";
import {config} from "@fortawesome/fontawesome-svg-core";

config.autoAddCss = false;

const geistSans = Roboto({
  weight: "200",
  subsets: ["latin"],
});

const geistMono = Roboto_Mono({
  weight: "300",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lucas Sartori - Portfolio",
  description: "Lucas Sartori - Portfolio",
};

export default function RootLayout({
                                     children,
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`${geistSans.className} antialiased`}
    >
    {children}
    </body>
    </html>
  );
}
