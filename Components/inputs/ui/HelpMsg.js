import { twMerge } from "tailwind-merge";

/**
 *
 * @param {import("@/types").HelpMsgInterface} param0
 * @returns
 */
export default function HelpMsg({ title = "", isDisabled, onClick }) {
  return (
    <button
      type="button"
      className="text-start mb-1 "
      onClick={(event) => {
        event.stopPropagation();
        // event.stopImmediatePropagation();
        onClick(event);
      }}
    >
      <span
        className={twMerge(
          "text-success-300 hover:text-success-500 underline transition-colors text-sm",
          isDisabled && "text-[#878787]",
        )}
      >
        {title}
      </span>
    </button>
  );
}
