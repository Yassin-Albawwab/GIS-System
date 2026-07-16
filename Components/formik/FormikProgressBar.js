import { getIn, useFormikContext } from "formik";
import Label from "@/components/inputs/ui/Label";
import { ProgressBar } from "../ProgressBar";
import ErrorMsg from "../inputs/ui/ErrorMsg";
export default function FormikProgressBar({
  label,
  field,
  form,
  mb_0 = false,
  order,
  isNumber = true,
  ...rest
}) {
  const name = field?.name ?? rest?.name;
  const touched = getIn(form?.touched, name);
  const _error = getIn(form?.errors, name);
  const value = field?.value ?? rest?.value;
  const error = touched && _error;
  const { setFieldValue } = useFormikContext();

  //   console.log("FormikRatingInput - field", field);
  console.log({ value });
  return (
    <div
      style={{ order: order }}
      className={`w-full flex flex-col gap-3 ${!mb_0 && "mb-6"}`}
    >
      <Label title={label} />
      <div className="grid grid-cols-[1fr_auto] gap-6 ">
        <input
          style={{ accentColor: "rgb(var(--primary-300))" }}
          className="w-full"
          type="range"
          min={0}
          max={100}
          value={value || 0}
          onChange={(e) =>
            setFieldValue(
              name,
              isNumber ? Number(e.target.value) : e.target.value,
            )
          }
          {...rest}
        />
        <span className="/text-primary-300 text-sm font-semibold">
          {value || 0}%
        </span>
      </div>
      <ErrorMsg error={error} />
    </div>
  );
}
