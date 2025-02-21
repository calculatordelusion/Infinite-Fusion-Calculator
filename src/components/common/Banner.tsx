"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Card } from "@/components/ui/card";
import { cn } from "@/utils";

// Ensure `window.adsbygoogle` exists
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

// Ad Format Types
type AdFormat = "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";

// Ad Layout Configuration
const AD_STRUCTURES = {
  horizontal: { width: "100%", height: "90px", maxWidth: "728px" },
  vertical: { width: "160px", height: "600px" },
  rectangle: { width: "300px", height: "250px" },
  auto: { width: "100%", height: "90px", minHeight: "90px" },
  fluid: { width: "100%", height: "auto", minHeight: "90px" },
} as const;

// Component Props
interface AdBannerProps {
  adClient?: string;
  adSlot?: string;
  format?: AdFormat;
  layout?: keyof typeof AD_STRUCTURES;
  className?: string;
}

const AdBanner: React.FC<AdBannerProps> = ({
  adClient = "ca-pub-6617838414961747",
  adSlot = "2872550279",
  format = "auto",
  layout = "horizontal",
  className = "",
}) => {
  const adRef = useRef<HTMLModElement>(null);
  const pathname = usePathname();
  const [adUnfilled, setAdUnfilled] = useState(false);

  useEffect(() => {
    const loadAd = () => {
      if (window.adsbygoogle && adRef.current) {
        adRef.current.innerHTML = ""; // Clear previous ads
        window.adsbygoogle.push({});
      }
    };

    const observer = new MutationObserver(() => {
      if (adRef.current?.getAttribute("data-ad-status") === "unfilled") {
        setAdUnfilled(true);
      } else {
        setAdUnfilled(false);
      }
    });

    if (adRef.current) {
      observer.observe(adRef.current, {
        attributes: true,
        attributeFilter: ["data-ad-status"],
      });
    }

    // Wait for AdSense script to be available
    const checkAdSense = setInterval(() => {
      if (window.adsbygoogle) {
        loadAd();
        clearInterval(checkAdSense);
      }
    }, 200);

    loadAd(); // Initial Load

    return () => {
      clearInterval(checkAdSense);
      observer.disconnect();
    };
  }, [pathname]);

  const structure = AD_STRUCTURES[layout];

  // Safe access using optional chaining and explicit type checking
  const minHeight =
    "minHeight" in structure ? structure.minHeight : structure.height;
  const maxWidth =
    "maxWidth" in structure ? structure.maxWidth : structure.width;

  return (
    <Card
      className={cn(
        "relative grid-lines flex justify-center items-center mx-auto overflow-hidden",
        className
      )}
      style={{
        minHeight,
        maxWidth,
      }}
    >
      {adUnfilled ? (
        <div className="bg-muted m-2 p-2 md:p-4 rounded-lg text-center text-muted-foreground">
          <p className="font-medium md:text-lg">
            Ad is currently unavailable 😓
          </p>
        </div>
      ) : (
        <ins
          ref={adRef}
          className={cn("adsbygoogle", className)}
          style={{ display: "block", ...AD_STRUCTURES[layout] }}
          data-ad-client={adClient}
          data-ad-slot={adSlot}
          data-ad-format={format}
          data-full-width-responsive="true"
        />
      )}
    </Card>
  );
};

export default AdBanner;
