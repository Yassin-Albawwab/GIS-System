import FormikCheckbox from "@/Components/formik/FormikCheckbox";
import BaseCheckbox from "@/Components/inputs/BaseCheckbox";
import { FieldArray, getIn, useFormikContext } from "formik";

export default function FormikLayerPicker({
  label,
  field,
  form,
  optsList,
  loading,
  ...rest
}) {
  const { errors, setFieldValue } = useFormikContext();

  const name = field.name ?? rest.name;
  const touched = getIn(form.touched, name);
  const _error = getIn(form.errors, name);
  const value = field.value ?? rest.value;
  const error = touched && _error;
  const onChange = field.onChange;
  const onBlur = field.onBlur;

  console.log("value", value);
  return (
    <>
      <FieldArray name={name}>
        {({ remove, replace, push }) => (
          <div className="grid justify-between w-full gap-y-2">
            {optsList?.map((layer, index) => {
              return (
                <BaseCheckbox
                  key={layer.id}
                  onChange={(e) => {
                    if (e.target.checked) {
                    } else {
                      push(layer);
                      //   push(layer);
                    }
                    // console.log("e", e);
                    // console.log("value", e.target.checked);
                  }}
                  isSwitch
                  value={value.find((x) => x.id == layer.id)}
                  containerClassName="w-full  justify-between"
                  labelClassName="font-medium p-0 m-0 me-2 max-w-[80%]"
                  component={FormikCheckbox}
                  label={layer?.id}
                />
              );
            })}
            {errors[name] ? (
              <span className="block text-sm text-error">{errors[name]}</span>
            ) : null}
          </div>
        )}
      </FieldArray>
    </>
  );
}

//    {value?.map((layer, index) => {
//       return (
//         <div
//           key={index}
//           className="flex flex-col sm:flex-row gap-2 rounded-[20px] p-4 border border-[#E2E8F0]"
//         >
//           <div className="relative flex shrink-0 gap-2">
//             <div className="flex   flex-col gap-4 justify-center items-center">
//               <div className=" p-[11px]"></div>
//               {/* <i
//                     className="ti ti-trash-x text-xl p-[11px] hover:text-primary-600 hover:ring-1 rounded-xl transition-all hover:ring-primary-600"
//                     tabIndex={0}
//                     aria-label={t("buttons.deleteProduct")}
//                     role="button"
//                     onClick={async () => {
//                     }}
//                   /> */}
//             </div>
//           </div>

//           <div className="relative flex flex-col py-2 w-full gap-6 ">
//             //text here
//           </div>
//         </div>
//       );
//     })}
