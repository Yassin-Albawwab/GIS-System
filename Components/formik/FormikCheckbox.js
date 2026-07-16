import BaseCheckbox from "./../inputs/BaseCheckbox";
import { getIn } from "formik";

const FormikCheckbox = ({
  label,
  type,
  field,
  form,
  size,
  isSwitch,
  noMargin,
  disabled,
  beforeChange = () => {},
  options = [],
  ...rest
}) => {
  const name = field.name;
  const value = field.value;

  const onChange = (e) => {
    // const newVal =
    //   options?.length > 0
    //     ? e.target.value === value
    //       ? ""
    //       : e.target.value
    //     : !value;
    let newVal;
    // console.log({ val: e.target.value });
    if (options?.length > 0) {
      if (value.length > 0 && value.includes(e.target.value)) {
        newVal =
          value.length > 1 ? value.filter((v) => v !== e.target.value) : [];
      } else {
        newVal = [...value, e.target.value];
      }
    } else {
      newVal = !value;
    }

    beforeChange(newVal);
    form.setFieldValue(name, newVal);
    // console.log({ newVal });
  };

  const touched = getIn(form.touched, name);
  const _error = getIn(form.errors, name);
  const error = touched && _error;
  return (
    <>
      <BaseCheckbox
        {...{
          name,
          label,
          value,
          onChange,
          size,
          isSwitch,
          disabled,
          error,
          options,
          noMargin,
          ...rest,
        }}
      />
    </>
  );
};

export default FormikCheckbox;
