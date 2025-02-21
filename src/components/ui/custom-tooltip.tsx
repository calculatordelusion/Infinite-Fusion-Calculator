"use client";
import React, { useState, useEffect, useRef, ReactNode } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
}

const CustomTooltip: React.FC<TooltipProps> = ({
  children,
  content,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener("click", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleInteraction = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={className}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <div
            ref={triggerRef}
            className="inline-flex items-center cursor-pointer"
            onClick={handleInteraction}
            onMouseEnter={() => !isMobile && setIsOpen(true)}
            onMouseLeave={() => !isMobile && setIsOpen(false)}
          >
            {children}
            {/* <InfoIcon className="flex-shrink-0 ml-1 w-4 h-4" /> */}
          </div>
        </PopoverTrigger>
        <PopoverContent className="mx-4">{content}</PopoverContent>
      </Popover>
    </div>
  );
};

export { CustomTooltip };
