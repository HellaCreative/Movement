import type { Metadata } from "next";

import { Nav } from "@/components/nav/Nav";
import { TickerStrip } from "@/components/stage/TickerStrip";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Movement",
  description: "Not a platform. A scene.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Nav />
        <TickerStrip />
        {children}
      </body>
    </html>
  );
}
