"use client";

import { createContext, ReactNode, useState, useEffect } from "react";

interface SpoilerContextType {
  spoilerMode: boolean;
  setSpoilerMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpoilerContext = createContext<SpoilerContextType>({
  spoilerMode: false,
  setSpoilerMode: () => {
    throw new Error("setSpoilerMode function must be overridden");
  },
});

export const SpoilerProvider = ({ children }: { children: ReactNode }) => {
  const [spoilerMode, setSpoilerMode] = useState<boolean>(() => {
    // This ensures localStorage is only accessed on the client-side
    if (typeof window !== "undefined") {
      return localStorage.getItem("spoilerMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    // Update localStorage whenever spoilerMode changes
    localStorage.setItem("spoilerMode", String(spoilerMode));
  }, [spoilerMode]);

  return (
    <SpoilerContext.Provider value={{ spoilerMode, setSpoilerMode }}>
      {children}
    </SpoilerContext.Provider>
  );
};

export default SpoilerContext;
