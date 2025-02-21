"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("system");
    } else {
      setTheme("light");
    }
  };

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      {theme === "light" && (
        <Sun className="w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-all" />
      )}
      {theme === "dark" && (
        <Moon className="w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-all" />
      )}
      {theme === "system" && (
        <Monitor className="w-[1.2rem] h-[1.2rem] rotate-0 scale-100 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}