"use client";
import { useParams, usePathname } from "next/navigation";
import React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

export default function MyButton({
  style = "primary",
  prIcon,
  secIcon,
  size = "sm",
  disabled,
  onClick = () => {},
  children,
  className,
  loading,
  type = "button",
  customStyle = {},
  href,
  hasHrefPathname = true,
  loading3dots = true,
  ariaLabel,
}) {
  const pathname = usePathname();
  const { lang } = useParams();
  const Component = href ? Link : "button";

  const buttonSize = {
    xs: "text-sm h-[28px]  gap-x-1 rounded-lg py-1 px-2",
    sm: "text-base h-[40px] gap-x-2 rounded-xl py-2 /pb-0.5 px-3",
    md: "text-base h-[44px] gap-x-2 rounded-xl py-2.5 px-4",
    lg: "text-base h-[44px] gap-x-2 rounded-xl py-2.5 px-4",
    xl: "text-base h-[48px] gap-x-2 rounded-2xl py-3 px-5",
    "2xl": "text-base h-[56px] gap-x-3 rounded-2xl py-4 px-7",
  };

  const buttonVariance = {
    primary:
      "text-accent bg-primary shadow-active hover:bg-primary/50  focus:bg-primary/60 disabled:text-neutral-500 disabled:shadow-active disabled:bg-neutral-200",
    secondary:
      "text-primary-500 bg-primary-100 shadow-active hover:bg-primary-200  hover:bg-primary-200  focus:bg-primary-100 focus:shadow-pressed focus:border focus:border-primary-300 active:shadow-active disabled:text-neutral-500 disabled:shadow-active disabled:bg-neutral-200 disabled:border disabled:bg-neutral-100",
    textGray:
      "bg-gray-300 disabled:bg-gray-500 hover:bg-gray-300/50 focus:bg-gray-300/70  focus:shadow-pressed",
    textColor:
      "text-primary-500 disabled:text-neutral-500 hover:bg-primary-100 focus:bg-primary-200   focus:shadow-pressed",
    outlineGrey:
      "text-neutral-800 border border-neutral-200  hover:bg-neutral-400 focus:text-primary-500 focus:border-neutral-500 focus:shadow-pressed disabled:border-neutral-200 disabled:text-neutral-400",
    outlineColor:
      "text-primary-500 border border-primary-500 hover:text-primary-600  hover:border-primary-600 focus:bg-primary-100  focus:shadow-pressed disabled:border-neutral-200 disabled:text-neutral-400",
  };

  const iconVariance = {
    primary: "",
    secondary: "",
    textGray: "",
    textColor: "",
    outlineGrey: "",
    outlineColor: "",
  };

  return (
    <Component
      href={
        href?.length > 0
          ? hasHrefPathname
            ? `/${lang}/${pathname}/${href}`
            : `/${lang}/${href}`
          : null
      }
      style={customStyle ?? {}}
      disabled={disabled || loading}
      onClick={onClick}
      type={type}
      aria-label={ariaLabel ?? "Button"}
      className={twMerge(
        `relative  font-shamelBold cursor-pointer  flex justify-center  items-center text-nowrap rounded-2xl transition-colors `,
        buttonSize[size],
        buttonVariance[style],
        className,
        // "pt-2",
      )}
    >
      {prIcon && <i className={twMerge(prIcon, iconVariance[style])}></i>}
      {loading ? (
        <div
          className={`flex  justify-between items-center flex-nowrap text-nowrap`}
        >
          <i className="animate-[spin_1.15s_linear_infinite] ti ti-loader-2 mb-1.5 text-[18px] me-1 " />
          {children}
          {loading3dots && <div className="loading text-start w-1" />}
        </div>
      ) : (
        children
      )}
      {secIcon && (
        <i className={twMerge(secIcon, iconVariance[style], "pb-1")} />
      )}
    </Component>
  );
}
