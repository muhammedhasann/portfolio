import React from "react";
import { cn } from "@/lib/utils";

type SpotlightProps = {
  className?: string;
  fill?: string;
  size?: "sm" | "md" | "lg"; // Added size options for flexibility
};

export const Spotlight = ({ className, fill, size = "md" }: SpotlightProps) => {
  // Adjust spotlight size based on prop
  const sizeClasses = {
    sm: "w-[100%] h-[120%] opacity-60",
    md: "w-[138%] h-[169%] opacity-70",
    lg: "w-[160%] h-[190%] opacity-80",
  };

  return (
    <svg
      className={cn(
        "animate-spotlight pointer-events-none absolute z-[1] opacity-0",
        sizeClasses[size],
        className
      )}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 3787 2842"
      fill="none"
    >
      <g filter="url(#filter)">
        <ellipse
          cx="1924.71"
          cy="273.501"
          rx="1924.71"
          ry="273.501"
          transform="matrix(-0.822377 -0.568943 -0.568943 0.822377 3631.88 2291.09)"
          fill={fill || "cyan"} // Default cyan for a futuristic feel
          fillOpacity="0.15" // Adjusted for a softer glow
        />
      </g>
      <defs>
        <filter
          id="filter"
          x="0.860352"
          y="0.838989"
          width="3785.16"
          height="2840.26"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feGaussianBlur
            stdDeviation="180" // Increased blur for a smoother glow
            result="effect1_foregroundBlur_1065_8"
          />
        </filter>
      </defs>
    </svg>
  );
};
