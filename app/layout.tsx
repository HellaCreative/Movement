import type { Metadata } from "next";

import { Footer } from "@/components/Footer";
import { AppProviders } from "@/components/providers/AppProviders";
import { Nav } from "@/components/nav/Nav";
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts";
import { FilterMegaMenu } from "@/components/stage/FilterMegaMenu";
import { TickerStrip } from "@/components/stage/TickerStrip";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Band as One",
  description: "Not a platform. A scene.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`}
    >
      <body>
        <AppProviders>
          <Nav />
          <FilterMegaMenu />
          <TickerStrip />
          {children}
          <Footer />
        </AppProviders>
      </body>
    </html>
  );
}
