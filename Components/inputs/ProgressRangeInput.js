"use client";

import { Slider } from "@material-tailwind/react";
import { useRef, useEffect, useState, useMemo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

export const ProgressRangeInput = ({
  label = "",
  startValue = 0,
  endValue = 100,
  onStartChange,
  onEndChange,
  hideLabel = false,
  progressBarContainerClassName = "",
}) => {
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  const safeStartValue = useMemo(
    () => Math.max(0, Number(startValue) || 0),
    [startValue],
  );
  const safeEndValue = useMemo(
    () => Math.max(0, Number(endValue) || 0),
    [endValue],
  );

  useEffect(() => {
    if (!sliderRef.current) return;

    const updateWidth = () => setSliderWidth(sliderRef.current.offsetWidth);
    updateWidth();

    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const startTooltipPosition = useMemo(() => {
    const minStartPosition = Math.max(safeStartValue / 100, 0.04);
    const val = Math.min(minStartPosition * sliderWidth, sliderWidth);

    return val;
  }, [safeStartValue, sliderWidth]);

  const endTooltipPosition = useMemo(() => {
    const val = Math.min((safeEndValue / 100) * sliderWidth, sliderWidth - 18);

    return val;
  }, [safeEndValue, sliderWidth]);

  const handleStartChange = useCallback(
    (value) => {
      const numValue = Number(value);
      if (numValue <= safeEndValue) onStartChange?.(numValue);
    },
    [onStartChange, safeEndValue],
  );

  const handleEndChange = useCallback(
    (value) => {
      const numValue = Number(value);
      if (numValue >= safeStartValue) onEndChange?.(numValue);
    },
    [onEndChange, safeStartValue],
  );

  return (
    <div className="flex flex-col max-w-full  ">
      {/* Label */}
      {!hideLabel && (
        <label className="text-primary-300 font-medium mb-8">{label}</label>
      )}

      {/* Slider Container */}
      <div
        ref={sliderRef}
        className={twMerge(
          " w-full mt-2 relative overflow-visible  ",
          progressBarContainerClassName,
          // safeEndValue === 100 ? "overflow-y-hidden" : "overflow-y-auto",
        )}
      >
        {/* Start Tooltip */}
        <Tooltip
          value={safeStartValue}
          position={startTooltipPosition}
          align="left"
        />

        {/* End Tooltip */}
        <Tooltip
          value={safeEndValue}
          position={endTooltipPosition}
          align="right"
        />
        <div className="relative w-full h-2 mt-1 ">
          {/* شريط بين start و end */}
          <div
            className="absolute h-2 bg-primary-400 z-10"
            style={{
              left: `${safeStartValue}%`,
              width: `${safeEndValue - safeStartValue}%`,
            }}
          />

          {/* Start Slider */}
          <Slider
            value={safeStartValue === 0 ? 0.1 : safeStartValue}
            min={0}
            max={100}
            onChange={(e) => handleStartChange(e.target.value)}
            className="absolute inset-0 !bg-transparent text-primary-300"
            trackClassName="!bg-transparent"
            barClassName="!bg-transparent"
          />

          {/* End Slider */}
          <Slider
            value={safeEndValue}
            min={0}
            max={100}
            onChange={(e) => handleEndChange(e.target.value)}
            className="absolute inset-0 !bg-transparent text-primary-300"
            trackClassName="!bg-transparent"
            barClassName="!bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

const Tooltip = ({ value, position }) => (
  <div
    className="absolute rounded-md w-[42px] px-1 h-[20px] grid place-items-center 
               bg-primary-300 text-white text-xs z-10 transition-all duration-200
               -translate-x-1/2"
    style={{ left: `${position}px`, top: "-2.5em" }}
  >
    {Math.round(value)}%
    <div className="absolute left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[5px] border-transparent border-t-primary-300 top-full" />
  </div>
);
