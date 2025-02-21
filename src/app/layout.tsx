import type { Metadata } from "next";
import { Asap } from "next/font/google";
import { ThemeProvider } from "@/components/theme";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/toaster";
import { Header, Footer } from "@/components/navigation";
import "@/styles/globals.css";
import "@/styles/dex-card.css";
import "@/styles/PokemonCard.css";
import { SpoilerProvider } from "@/context/spoiler";
import { TooltipProvider } from "@/components/ui/tooltip";
import { config } from "@/config";

const mainFont = Asap({
  weight: ["400"],
  style: "normal",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(config.site.mainURL),
  title: {
    default: "Pokémon Infinite Fusion Calculator",
    template: "%s | fusioncalculator.site",
  },
  authors: [{ name: `${config.site.name} Community` }],
  creator: `${config.site.name}`,
  verification: {},
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mainFont.className} max-w-screen-2xl flex flex-col mx-auto min-h-screen`}
      >
        <NextTopLoader />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <SpoilerProvider>
              <Header />
              <main className="max-w-screen-2xl">{children}</main>
              <Footer />
              <Toaster />
            </SpoilerProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
