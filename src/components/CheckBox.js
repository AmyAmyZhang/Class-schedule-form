import React from "react";
import { Field } from "react-final-form";

const Checkbox = ({
  data,
  name,
  label,
  isRequired,
  errorMessage,
  onChangeArea
}) => {
  return (
    <React.Fragment>
      <label className="form-field-label">{label}</label>
      <div className="form-checkbox-wrapper">
        {data.map((element, index) => (
          <label className="form-checkbox" key={`${element.name}-${index}`}>
            <Field
              name={name}
              type={element.type}
              value={element.label}
              validate={(value) => {
                return isRequired && (!value || (value && value.length === 0))
                  ? errorMessage
                  : undefined;
              }}
            >
              {({ input, meta }) => (
                <React.Fragment>
                  <input
                    {...input}
                    id={element.id}
                    onChange={(e) => {
                      input.onChange(e);
                      onChangeArea(e);
                    }}
                  />
                  {meta.error && meta.touched && index === data.length - 1 && (
                    <span className="form-inline-error-checkbox">
                      {meta.error}
                    </span>
                  )}
                </React.Fragment>
              )}
            </Field>
            {element.label}
          </label>
        ))}
      </div>
    </React.Fragment>
  );
};

export default Checkbox;
