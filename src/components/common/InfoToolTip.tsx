"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InfoIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface InfoTooltipProps {
  name: string;
  content: string;
  className?: string;
}

const InfoToolTip = ({ name, content, className }: InfoTooltipProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const triggerRef = useRef<HTMLSpanElement>(null);

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle clicks outside the tooltip and scrolling
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    const handleScroll = () => setIsOpen(false);

    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle tooltip interaction
  const handleInteraction = (event: React.MouseEvent | React.TouchEvent) => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div
      className={`${className} border rounded hover:underline bg-muted/50 p-1`}
    >
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <span
            ref={triggerRef}
            className="flex items-center gap-1 cursor-pointer"
            onClick={handleInteraction}
            onMouseEnter={() => !isMobile && setIsOpen(true)}
            onMouseLeave={() => !isMobile && setIsOpen(false)}
          >
            <span className="font-medium text-gray-700 text-sm dark:text-gray-300 truncate">
              {name}
            </span>
            <InfoIcon className="w-4 h-4 text-gray-600" />
          </span>
        </PopoverTrigger>
        <PopoverContent className="shadow-md p-2 border rounded-md w-64 text-sm">
          <p className="leading-snug">
            <span className="font-semibold">{name}</span>: {content}
          </p>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export { InfoToolTip };
