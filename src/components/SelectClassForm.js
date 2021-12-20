import React, { useState } from "react";
import { Form } from "react-final-form";
import InputField from "./InputField";
import CheckBox from "./CheckBox";
import RadioButtons from "./RadioButtons";
import { mergeWith, isArray } from 'lodash';
import { noDateOverlap } from "../helper/help";
import "./SelectClassForm.scss";

const SelectClassForm = ({ formData }) => {

  const [areas, updateAreas] = useState(undefined);
  const [confirmation, UpdateConfirmation] = useState(false);
  const [classes, updateClasses] = useState([]);
  const [inlineError, updateError] = useState(undefined);
  const [formValues, updateFormValues] = useState({});

   // after submit, log the form selection
   const onSubmit = async () => {
    console.log(JSON.stringify(formValues, 0, 2));
  };

  // area selection handler
  const onChangeArea = (e, data) => {
    let selectedAreas = areas;
    // add new area
    if (e.target.checked) {
      let addedArea = data.filter((element) => {
        return e.target.id === element.id;
      });
      // let areaAlreadyExist = selectedAreas.filter((element) => element.id === e.target.id);
      if (!areas) {
        selectedAreas = [].concat(addedArea);
      } else { // make sure that area is not added already
        selectedAreas = areas.concat(addedArea);
      }
      function customizer(objValue, srcValue) {
        if (isArray(objValue)) {
          return objValue.concat(srcValue);
        }
      }
      updateFormValues(mergeWith(formValues, { [e.target.name]: [e.target.value] }, customizer));
    } else {
      // remove selected area
      let removedElement = areas.filter((element) => {
        return e.target.id === element.id;
      });
      // clean selected study areas
      let updatedValues = formValues[e.target.name].filter(el => el !== e.target.value);

      let updatedAreas = { [e.target.name]: updatedValues };

      // clean scheduled classes
      if (removedElement[0].data[0].name) {
        delete formValues[removedElement[0].data[0].name];
      }
      updateFormValues(Object.assign(formValues, updatedAreas))
      updateError(undefined);

      selectedAreas =
        areas &&
        areas.length > 0 &&
        areas.filter((element) => {
          return e.target.id !== element.id;
        });
      if (selectedAreas.length === 0) {
        selectedAreas = undefined;
      }
    }
    updateAreas(selectedAreas);
  };

  // class schedule handler
  const onChangeClassSchedule = (e, element, detailErrorMessage) => {
    let newClasses = classes.filter((ele) => ele.name !== element.name);
    newClasses = newClasses.concat(new Array(element));
    newClasses.sort((a, b) => new Date(a.date[0]) - new Date(b.date[0]));

    let dates = newClasses.map((e) => e.date);
    let noOverlap = noDateOverlap(dates);
    if (noOverlap) {
      updateClasses(newClasses);
      updateError(undefined);
      updateFormValues(Object.assign(formValues, { [e.target.name]: e.target.value}))
      // update
    } else {
      updateError(detailErrorMessage);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitSucceeded, form }) => {
        return (
          <form onSubmit={handleSubmit} className="form">
            {formData.map((prop, index) => {
              if (prop.type === "text") {
                // name, email, birthday form fields
                return (
                  <div className="form-field" key={`${prop.name}-${index}`}>
                    <InputField {...prop} formValues={formValues} updateFormValues={(name, value) => updateFormValues(name, value)}/>
                  </div>
                );
              } else if (prop.type === "checkbox") {
                // area of studies
                return (
                  <div
                    className="form-field form-field-checkbox"
                    key={`${prop.name}-${index}`}
                  >
                    <CheckBox
                      {...prop}
                      onChangeArea={(e) => onChangeArea(e, prop.data)}
                    />
                  </div>
                );
              }
              return null;
            })}
            {/* schedule classes */}
            {areas && (
              <RadioButtons
                areas={areas}
                onChangeClassSchedule={(e, element, detailErrorMessage) =>
                  onChangeClassSchedule(e, element, detailErrorMessage)
                }
                inlineError={inlineError}
              />
            )}
            {/* confirmation block */}
            <div className="form-data-wrapper">
              <p className="form-data-wrapper-title">
                Please review your selection before you submit, once confirmed,
                please do not modify again
              </p>
              {formValues && (
                <React.Fragment>
                  <div className="form-data-collection">
                    {Object.entries(formValues).map((value) => (
                      <p key={`${value[0]}`}>{`${value[0]}: ${value[1]}`}</p>
                    ))}
                    <button
                      className="button confirm-button"
                      type="button"
                      disabled={Object.keys(formValues).length < 5 || inlineError || confirmation}
                      onClick={() => UpdateConfirmation(true)}
                    >
                      {confirmation ? "Confirmed" : "Confirm"}
                    </button>
                  </div>
                </React.Fragment>
              )}
            </div>
            <button
              className={`button submit-button`}
              type="submit"
              disabled={submitting || submitSucceeded || !confirmation}
            >
              {submitSucceeded ? "Submitted" : "Submit"}
            </button>
            <p className="note">
              All the fields are required except where noted optional.
            </p>
          </form>
        );
      }}
    />
  );
};

export default SelectClassForm;
