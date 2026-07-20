import { twMerge } from "tailwind-merge";
import Label from "./ui/Label";

//import PropTypes from 'prop-types';
const BaseRadio = ({
  name,
  label,
  value,
  options,
  onChange,
  error,
  radioButtonClassName,
  color = "blue",
  disabled,
  size = "lg",
  htmlFor,
  containerClassName,
  labelClassName,
}) => {
  // console.log("value", value);
  const radioSize = { sm: "size-3", lg: "size-4" };
  const radioDotSize = { sm: "size-1", lg: "size-[5px]" };
  const labelSize = { sm: "text-sm", lg: "text-base" };
  return (
    <>
      <div>
        <label
          className={twMerge(
            `block w-full relative`,
            error && "text-red-500",
            containerClassName,
          )}
        >
          {label && (
            <Label
              title={label}
              isDisabled={disabled}
              showTag={false}
              // isRequired={required}
              customClasses={labelClassName}
            />
          )}
          <div
            className={twMerge(
              "flex flex-col gap-0 mt-2 ltr:ml-2 ",
              radioButtonClassName,
            )}
          >
            {options?.map((op, i, ops) => (
              <label
                key={crypto.randomUUID()}
                htmlFor={
                  htmlFor
                    ? `${htmlFor} rad-${name}-${op.value}`
                    : `rad-${name}-${op.value}`
                }
                className={twMerge(
                  "w-full text-sm",
                  disabled ? "cursor-not-allowed" : " cursor-pointer",
                  labelClassName,
                  op.labelClassName,
                )}
              >
                <div
                  key={op.value}
                  className={twMerge(
                    "group  w-full flex items-center text-neutral-900 gap-2.5 py-0.5 ",
                  )}
                >
                  <div
                    tabIndex={Math.random()}
                    className={twMerge(
                      "outline-none size-4 rounded-full border flex shrink-0 justify-center items-center transition-all duration-300",
                      radioSize[size],
                      value === op.value
                        ? `${
                            disabled
                              ? "border-[#D6D6D6] dark:border-[#606060]"
                              : "border-[#005682] bg-[#B0D1E2] focus:ring-[#005682] focus:ring-1 dark:border-[#006CA2] dark:bg-[#003149]"
                          } `
                        : `${
                            disabled
                              ? "border-[#D6D6D6] dark:border-[#606060]"
                              : "border-[#878787]  bg-transparent group-hover:bg-[#B0D1E2] group-focus:bg-[#B0D1E2] focus:bg-[#B0D1E2]  dark:border-[#C2C2C2] dark:group-hover:bg-[#006CA2] dark:group-focus:bg-[#006CA2] dark:focus:bg-[#006CA2]"
                          } `,
                    )}
                  >
                    {value === `${op.value}` && (
                      <div
                        className={`${
                          disabled
                            ? "bg-[#D6D6D6] dark:bg-[#606060]"
                            : "bg-[#005682] dark:bg-[#006CA2]"
                        } ${radioDotSize[size]} rounded-full `}
                      />
                    )}
                  </div>
                  <input
                    className={`hidden w-full //size-6 accent-[red]`}
                    //   style={{ accentColor: color }}
                    id={
                      htmlFor
                        ? `${htmlFor} rad-${name}-${op.value}`
                        : `rad-${name}-${op.value}`
                    }
                    type="radio"
                    name={name}
                    value={op.value}
                    checked={value === `${op.value}`}
                    onChange={onChange}
                    disabled={disabled}
                  />
                  <span
                    className={twMerge("text-neutral-900", labelSize[size])}
                  >
                    {op.label}
                  </span>
                  {op?.desc && (
                    <span className="text-neutral-800/50">{op?.desc}</span>
                  )}
                </div>
                {i === ops.length - 1 &&
                  (error ? (
                    <span className="block text-sm text-danger-300">
                      {error}
                    </span>
                  ) : null)}
              </label>
            ))}
          </div>
        </label>
      </div>
    </>
  );
};

export default BaseRadio;
