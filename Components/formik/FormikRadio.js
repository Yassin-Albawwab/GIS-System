import BaseRadio from "./../inputs/BaseRadio";
import { getIn } from "formik";

const FormikRadio = ({
  label,
  options,
  field,
  form,
  disabled,
  size,
  radioButtonClassName,
  beforeChange = () => {},
  ...props
}) => {
  const name = field.name;
  const value = field.value;
  const _error = getIn(form.errors, name);
  const touched = getIn(form.touched, name);
  const error = touched && _error;

  const onChange = (e) => {
    beforeChange(e);
    field.onChange(e);
  };

  return (
    <>
      <BaseRadio
        {...{
          name,
          label,
          value,
          options,
          onChange,
          error,
          disabled,
          size,
          radioButtonClassName,
          ...props,
        }}
      />
    </>
  );
};

export default FormikRadio;
