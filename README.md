## Table of Contents

- [Libraries](#requirementsprerequisites)
- [Introduction](#Introduction)
- [Application Structure](#application-structure)

## Libraries

- [react](https://github.com/facebook/react)
- [react-final-form](https://github.com/final-form/react-final-form)

## Introduction

Built a form which inlcudes name, email, birthday, area of studies and class schedule.

Included form validation:

**name:** must include last and first name, and should be separated by empty space

**email:** should only have 1 @ chacacter

**Birthday:** should match the pattern 'DD/MM/YYYY'

**area of studies:** should at least select one

**class schedule:** if want to take 2 classes whcich dates have overlap, will show error message

Once user fill the form, the review section will ask user to cinfirm the detail before submitting.

Once submit, will log a JSon object in the console.

## application-structure

**db.json:** include the JSON Object which provide the details to render the form

**helper:** include helper function

**components:** inlcude the parent form component and child form fields components
