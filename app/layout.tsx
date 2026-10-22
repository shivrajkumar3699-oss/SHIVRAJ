import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SHIVRAJ — Creative Developer · AI · Web",
  description: "Shivraj Kumar — Creative Developer building ideas into experiences.",
  themeColor: "#0a0608",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Viaoda+Libre&family=Imprima&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
