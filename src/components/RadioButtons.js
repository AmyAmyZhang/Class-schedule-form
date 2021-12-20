import React from "react";
import { Field } from "react-final-form";

const RadioButtons = ({ areas, onChangeClassSchedule, inlineError }) => {
  return (
    <React.Fragment>
      {areas.map((area, index) => (
        <div
          className="form-field form-field-radio-button"
          key={`area-${index}`}
        >
          <label className="form-field-label">{area.label}</label>
          <div className="form-radio-button-wrapper">
            {area.data.map((element, keyIndex) => (
              <div key={`${element.name}-${keyIndex}`} className="form-radio-button">
                <Field
                  type={element.type}
                  name={element.name}
                  value={element.label}
                >
                  {({ input }) => (
                    <>
                      <input
                        {...input}
                        id={element.id}
                        type={element.type}
                        name={element.name}
                        // checked
                        value={element.label}
                        onChange={(e) => {
                          input.onChange(e);
                          onChangeClassSchedule(e,
                            element,
                            area.detailErrorMessage
                          );
                        }}
                      />
                      <label htmlFor={element.id}>{element.label}</label>
                    </>
                  )}
                </Field>
              </div>
            ))}
          </div>
          {inlineError && index === areas.length - 1 && (
            <span className="form-inline-error">{inlineError}</span>
          )}
        </div>
      ))}
    </React.Fragment>
  );
};

export default RadioButtons;
