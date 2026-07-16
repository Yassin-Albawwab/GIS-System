//import PropTypes from 'prop-types';
import styles from "@/utils/toggleSwitch.module.css";
import { twMerge } from "tailwind-merge";
import Label from "./ui/Label";

const Box = ({ condition, size, disabled, boxClassName }) => {
  const checkboxSize = {
    sm: "size-3  relative -top-[1px]",
    lg: "size-[18px] relative -top-[1px]",
  };
  const checkboxSignSize = {
    sm: "text-[12px] relative -left-[1px]",
    lg: " text-xl //mb-0.5",
  };

  return (
    <div className="outline-none ">
      <div
        tabIndex={Math.random()}
        className={twMerge(
          "outline-none flex shrink-0 justify-center items-center size-4  rounded transition-all duration-300  dark:hover:bg-[#00314992] //text-xxs",
          checkboxSize[size],
          condition
            ? " text-[#006CA2] bg-[#B0D1E2] hover:bg-[#b0d1e283] focus:ring-[#005682] focus:ring-1 dark:bg-[#003149] "
            : "border border-[#878787] dark:border-[#C2C2C2] hover:bg-[#B0D1E2] focus:bg-[#B0D1E2] focus:border-none focus:ring-[#005682] focus:ring-1 dark:hover:bg-[#003149] dark:focus:bg-[#003149]  ",
          disabled &&
            "text-[#D6D6D6] bg-transparent border border-[#D6D6D6] dark:text-[#606060] dark:border-[#606060]",
          boxClassName,
        )}
      >
        <i
          className={twMerge(
            "bx bx-check bold flex justify-center items-center transition-all duration-300",
            checkboxSignSize[size],
            disabled && "text-[#D6D6D6] dark:text-[#606060]",
            condition ? "opacity-100" : "opacity-0",
          )}
        />

        {/* {value ? <i className="bi bi-check-lg mt-0.5 "></i> : ""} */}
        {/* {value ? "\u2714" : ""} */}
      </div>
    </div>
  );
};

const ErrorBlock = ({ error }) => {
  return error ? (
    <span className="block ltr:ml-1.5 text-sm  text-danger-300">{error}</span>
  ) : null;
};

const BaseCheckbox = ({
  name,
  label,
  value,
  onChange,
  isSwitch,
  color = "accent-[var(--primary-300)]",
  size,
  disabled,
  boxClassName,
  error,
  options,
  readOnly,
  optionsClassName,
  noMargin = false,
  ...rest
}) => {
  return (
    <>
      {isSwitch ? (
        <div className={twMerge("inline-block", noMargin ? "" : "mb-0")}>
          <div
            className={twMerge(
              " flex /justify-center items-center",
              rest.containerClassName,
            )}
          >
            {label && rest?.labelPosition !== "after" && (
              <span
                className={twMerge(
                  "mx-2 text-sm font-semibold text-neutral-900",
                  rest.labelClassName,
                )}
              >
                {label}
              </span>
            )}
            <label className={styles.switch}>
              <input
                type="checkbox"
                name={name}
                checked={value}
                onChange={onChange}
                readOnly={readOnly}
                disabled={disabled}
              />
              <span
                className={`${styles.slider} ${styles.round} ${disabled ? styles.disabled : ""}`}
              ></span>
            </label>
            {label && rest?.labelPosition === "after" && (
              <span
                className={twMerge(
                  "mx-2 text-sm font-semibold text-neutral-900",
                  rest.labelClassName,
                )}
              >
                {label}
              </span>
            )}
          </div>
        </div>
      ) : options?.length > 0 ? (
        <>
          {label && (
            <Label
              title={label}
              isDisabled={disabled}
              customClasses={rest.containerClassName}
            />
          )}
          <div
            className={twMerge(
              "flex flex-col gap-3.5 mt-3.5",
              optionsClassName,
            )}
          >
            {options.map((option) => (
              <label
                key={option.label}
                className={twMerge(
                  "flex items-center ltr:pl-1 rtl:pr-1 gap-1 cursor-pointer text-neutral-800 text-sm font-normal",
                  size === "lg" && "text-base",
                  rest.labelClassName,
                  option.labelClassName,
                )}
              >
                <Box
                  condition={value?.length > 0 && value.includes(option.value)}
                  size={size ?? "sm"}
                  {...{ disabled, boxClassName }}
                />
                <span
                  className={twMerge(
                    "",
                    label && "ltr:pl-2 rtl:pr-2",
                    option.containerClassName,
                  )}
                >
                  {option.label}
                </span>
                <input
                  className={twMerge(
                    `hidden absolute top-0 ltr:left-0 rtl:right-0 size-6 accent(--primary-300) ${color}`,
                    rest.labelClassName,
                  )}
                  type="checkbox"
                  name={name}
                  checked={value?.length > 0 && value.includes(option.value)}
                  value={option.value}
                  onChange={onChange}
                  disabled={disabled}
                />
              </label>
            ))}
          </div>
          <ErrorBlock error={error} />
        </>
      ) : (
        <label
          className={twMerge(
            "flex items-center gap-2 ltr:pl-1 rtl:pr-1 cursor-pointer",
            noMargin ? "" : "mb-7",
            rest.containerClassName,
          )}
        >
          <Box
            condition={value}
            size={size ?? "lg"}
            {...{ disabled, boxClassName }}
          />
          <span
            className={twMerge(
              "text-neutral-700",
              label ? "ltr:pl-2 rtl:pr-2" : "",
              rest.labelClassName,
            )}
          >
            {label}
          </span>
          <input
            className={twMerge(
              `hidden absolute top-0 ltr:left-0 rtl:right-0 size-6  accent-[var(--primary-300)] ${color}`,
            )}
            type="checkbox"
            name={name}
            checked={readOnly ? undefined : value}
            onChange={onChange}
            disabled={disabled}
            readOnly={readOnly}
          />
          <ErrorBlock error={error} />
        </label>
      )}
    </>
  );
};

export default BaseCheckbox;
