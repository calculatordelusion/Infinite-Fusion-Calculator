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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// FONT OPTIMIZATION (Preload + Subset)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const mainFont = Asap({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-main",
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// DYNAMIC METADATA (SEO Optimized)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export const metadata: Metadata = {
  metadataBase: new URL(config.site.mainURL),
  title: {
    default: "Pokémon Infinite Fusion Calculator | Sprites & Fusions Database",
    template: "%s | Pokémon Infinite Fusion Calculator",
  },
  description: "The ultimate Pokémon Infinite Fusion calculator with 176,400+ possible fusions. Browse sprites, stats, and fusion combinations for all Pokémon generations. Create custom fusions instantly!",
  keywords: [
    "pokemon infinite fusion calculator",
    "pokemon fusion generator",
    "pokemon infinite fusion sprites",
    "pokemon fusion combinations",
    "best pokemon fusions",
    "infinite fusion dex",
    "pokemon fusion stats",
    "custom pokemon creator",
  ],
  authors: [{ 
    name: `${config.site.name} Team`, 
    url: config.site.mainURL 
  }],
  creator: "PokéFusion Team",
  publisher: "PokéFusion Network",
  applicationName: `${config.site.name}`,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon-32x32.png",
      },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: config.site.mainURL,
    siteName: `${config.site.name}`,
    title: "Pokémon Infinite Fusion Calculator | Sprites & Fusions Database",
    description: "Create and explore 176,400+ Pokémon fusions with our advanced calculator. Instant sprite generation and stat combinations!",
    images: [
      {
        url: `${config.site.mainURL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Pokémon Infinite Fusion Calculator Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pokémon Infinite Fusion Calculator | Sprites & Fusions Database",
    description: "Create and explore 176,400+ Pokémon fusions with our advanced calculator. Instant sprite generation and stat combinations!",
    images: [`${config.site.mainURL}/og-image.jpg`],
    creator: "@PokeFusionApp",
    site: "@PokeFusionApp",
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_KEY",
    yandex: "YANDEX_VERIFICATION_KEY",
  },
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// SCHEMA MARKUP (Advanced Structured Data)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const StructuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": `${config.site.name}`,
  "url": config.site.mainURL,
  "description": "The ultimate Pokémon Infinite Fusion calculator with 176,400+ possible fusions.",
  "applicationCategory": "GameApplication",
  "operatingSystem": "Web Browser",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "creator": {
    "@type": "Organization",
    "name": `${config.site.name} Team`,
    "url": config.site.mainURL,
    "logo": `${config.site.mainURL}/logo-512x512.png`
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": `${config.site.mainURL}/search?q={search_term_string}`,
    "query-input": "required name=search_term_string"
  },
  "interactionStatistic": {
    "@type": "InteractionCounter",
    "interactionType": "https://schema.org/WebSiteUsage",
    "userInteractionCount": "1000000"
  }
};

const BreadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": config.site.mainURL
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Fusion Calculator",
      "item": `${config.site.mainURL}/calculator`
    }
  ]
};

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ROOT LAYOUT (SEO Optimized Structure)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preload Critical Resources */}
        <link rel="preload" href="/fonts/Asap-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(StructuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(BreadcrumbSchema) }}
        />
        
        {/* Mobile Viewport Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#3b82f6" />
        
        {/* PWA/Safari Meta */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      
      <body className={`${mainFont.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        {/* Smooth Loading Indicator */}
        <NextTopLoader 
          color="#3b82f6" 
          height={3} 
          showSpinner={false}
          shadow="0 0 10px #3b82f6,0 0 5px #3b82f6"
        />
        
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <TooltipProvider delayDuration={300}>
            <SpoilerProvider>
              {/* Skip to Content Link (Accessibility) */}
              <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:px-4 focus:py-2 focus:top-2 focus:left-2 focus:bg-blue-600 focus:text-white focus:rounded-md focus:z-50">
                Skip to content
              </a>
              
              <Header />
              
              <main 
                id="main-content"
                className="flex-1"
                itemScope
                itemType="https://schema.org/CollectionPage"
              >
                {children}
              </main>
              
              <Footer />
              <Toaster />
            </SpoilerProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}