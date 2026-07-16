import { twMerge } from "tailwind-merge";

/**
 *
 * @param {import("@/types").LabelInterface} param0
 * @returns
 */
export default function Label({
  title,
  isRequired,
  isDisabled,
  customClasses,
  showTag = true,
  children,
}) {
  return (
    <div
      className={twMerge(
        "space-x-1.5 relative flex items-start text-[#383838] dark:text-[#67CCFF] transition-colors ",
        isDisabled && "text-neutral-600  ",
        customClasses,
      )}
    >
      <span className={twMerge("leading-[19.5px]")}>
        {title && title}
        {children}
      </span>
      {showTag && (
        <span
          className={twMerge(
            "hide-button-print-mode  mb-1 text-base leading-[11.2px] tracking-tight transition-colors",
            isRequired ? "text-danger-300" : "text-[#005682]",
            isDisabled && "text-[#D6D6D6] dark:text-[#606060]",
          )}
        >
          {isRequired && "*"}
        </span>
      )}
    </div>
  );
}
