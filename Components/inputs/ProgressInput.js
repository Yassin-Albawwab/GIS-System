import { Slider } from "@material-tailwind/react";
import React, { useRef, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export const ProgressInput = ({
  label = "",
  value,
  onChange,
  hideLabel = false,
  progressBarContainerClassName,
}) => {
  const sliderRef = useRef(null);
  const [tooltipPosition, setTooltipPosition] = useState(0);

  useEffect(() => {
    if (sliderRef.current) {
      const sliderWidth = sliderRef.current.offsetWidth;
      const thumbWidth = 46; // Width of the thumb or tooltip box
      const thumbAdjustment = thumbWidth / 2; // Adjustment for tooltip centering
      const progress = value / 100; // Normalized progress (0 to 1)

      // Calculate exact tooltip position
      const newPosition =
        progress * (sliderWidth - thumbWidth) + thumbAdjustment;

      setTooltipPosition(newPosition);
    }
  }, [value]);

  return (
    <div className="flex flex-col">
      {/* Optional Label */}
      {!hideLabel && (
        <span className={"text-primary-300 font-medium mb-8"}>{label}</span>
      )}

      {/* Slider Container */}
      <div
        className={twMerge("relative w-full", progressBarContainerClassName)}
        ref={sliderRef}
      >
        {/* Tooltip */}
        <div
          className={twMerge(
            "absolute rounded-md w-[42px] px-1 h-[20px] grid place-items-center bg-primary-300 text-white text-xs transform",
          )}
          style={{
            left: `${tooltipPosition}px`,
            top: "-2.5em",
            transform: "translateX(-50%)", // Keep centered over thumb
          }}
        >
          {Math.round(Number(value))}%
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-primary-300 top-full" />
        </div>

        {/* Slider */}
        <Slider
          barClassName="!bg-primary-300"
          trackClassName="[&::-webkit-slider-runnable-track]:bg-transparent [&::-moz-range-track]:bg-transparent rounded-none !bg-primary-200 "
          className="text-primary-300"
          defaultValue={Number(value ?? 0)}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
