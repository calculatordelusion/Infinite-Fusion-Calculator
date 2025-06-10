"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/theme.utils";
import {
  Eye,
  EyeOff
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContext, useState } from "react";
import { ThemeToggle } from "../theme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SpoilerContext from "@/context/spoiler";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";



export default function Header() {
  const currentRoute = usePathname();
  const [isSearchOpen, setSearchOpen] = useState(false);
  const { spoilerMode, setSpoilerMode } = useContext(SpoilerContext);
  const { toast } = useToast();

  const handleSpoilerToggle = () => {
    const newSpoilerMode = !spoilerMode;
    setSpoilerMode(newSpoilerMode);
    localStorage.setItem("spoilerMode", String(newSpoilerMode));

    toast({
      title: `Spoiler Mode ${newSpoilerMode ? "Enabled" : "Disabled"}`,
      description: newSpoilerMode
        ? "Custom sprites are now hidden. Spoilers are off."
        : "Custom sprites are visible. Spoilers are on.",
      variant: newSpoilerMode ? "destructive" : "default",
      duration: 2000,
    });
  };

  return (
    <nav className="top-0 z-50 sticky bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60 border-gray-200 dark:border-gray-700 border-b w-full">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center my-1">
          {/* Logo */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  prefetch={false}
                  href="/"
                  className="group flex items-center space-x-2"
                >
                  <Image
                    src={`/pokemon-infnite-fusion-calculator.png`}
                    alt="pokemon infinite fusion calculator"
                    height={396}
                    width={396}
                    className="size-110 group-hover:scale-110 transition-transform duration-300"
                  />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Pokémon Infinite Fusion</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="flex gap-8 lg:gap-16">
           

            {/* User Menu and Navigation */}
            <div className="flex items-center space-x-1">
             

              {/* Spoiler Mode Toggle */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleSpoilerToggle}
                      className={cn(
                        "transition-colors duration-300",
                        spoilerMode
                          ? "bg-red-100 dark:bg-red-900/30 hover:bg-red-200"
                          : "hover:bg-green-100 dark:hover:bg-green-900/30"
                      )}
                    >
                      {spoilerMode ? (
                        <EyeOff className="text-red-600 dark:text-red-400" />
                      ) : (
                        <Eye className="text-green-600 dark:text-green-400" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{spoilerMode ? "Enable Spoilers" : "Hide Spoilers"}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {/* Theme Toggle */}
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>

    </nav>
  );
}

