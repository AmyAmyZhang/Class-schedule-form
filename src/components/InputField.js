import React from "react";
import { Field } from "react-final-form";

const InputField = ({
  label,
  name,
  isRequired,
  errorMessage,
  type,
  id,
  innerLabel,
  regexPattern,
  updateFormValues,
  formValues,
}) => (
  <React.Fragment>
    <label className="form-field-label">{label}</label>
    <Field
      name={name}
      validate={(value) => {
        return (isRequired && !value) ||
          (regexPattern &&
            value &&
            !new RegExp(regexPattern).test(value.toLowerCase()))
          ? errorMessage
          : undefined;
      }}
    >
      {({ input, meta }) => (
        <React.Fragment>
          <input
            {...input}
            type={type}
            id={id}
            className={`form-textbox-input ${
              input.value ? "form-textbox-entered" : ""
            } ${meta.error && meta.touched && "form-error-wrapper"}`}
            placeholder={innerLabel}
            onChange={(e) => { 
              input.onChange(e);
              updateFormValues(
                Object.assign(formValues, { [name]: e.target.value })
              )
            }}
          />
          {meta.error && meta.touched && (
            <span className="form-inline-error">{meta.error}</span>
          )}
        </React.Fragment>
      )}
    </Field>
  </React.Fragment>
);

export default InputField;
