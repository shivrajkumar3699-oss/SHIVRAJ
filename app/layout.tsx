import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHIVRAJ — Creative Developer · AI · Web",
  description: "Shivraj Kumar — Creative Developer building ideas into experiences.",
  themeColor: "#050505"
};

export default function RootLayout({ children }: Readonly<{children: React.ReactNode}>) {
  return <html lang="en" className={GeistSans.variable}><body>{children}</body></html>;
}