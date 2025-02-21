"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/utils/theme.utils";

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full",
      "bg-gray-200 dark:bg-gray-800", // Smooth contrast background
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        "flex-1 w-full h-full transition-all duration-300 ease-in-out",
        "bg-gradient-to-r", // Gradient base
        // Light mode: green and pink tones
        "from-red-200 via-lime-400 to-green-500",
        // Dark mode: deeper green tones
        "dark:from-green-500 dark:via-emerald-600 dark:to-teal-500",
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
