import { twMerge } from "tailwind-merge";

export default function StatusIndicator({
  color = "bg-black",
  textColor = "",
  bubbleColor,
  label = "",
  style,
  containerClassname = "",
}) {
  return (
    <div
      className={twMerge(
        "flex items-center gap-1.5  rounded-full",
        bubbleColor && `px-3 py-1 ${bubbleColor}`,
        containerClassname,
      )}
    >
      {color && (
        <div
          className={twMerge("size-2  rounded-full relative -top-px", color)}
          style={style}
        />
      )}
      <span
        className={twMerge("text-neutral-800 font-medium text-sm", textColor)}
      >
        {label}
      </span>
    </div>
  );
}
