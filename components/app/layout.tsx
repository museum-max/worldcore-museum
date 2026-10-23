import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WORLCORE MUSEUM | NFT Gallery",
  description:
    "Explore a black-and-gold immersive 3D digital art museum.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
