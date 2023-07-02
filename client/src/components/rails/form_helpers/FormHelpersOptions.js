import React from "react";
import Form from "./helpers/Form";

function FormHelperOptions({ formHelper, handleCodeChange }) {
  switch (formHelper) {
    case "form":
      return <Form handleCodeChange={handleCodeChange} />;
    // case "select_dropdown":
    //   return (
    //   );
    // case "text_field":
    // case "check_box":
    // case "radio":
    // case "label":
    // case "hidden_field":
    // case "fields_for":
    // case "collections":
    // case "i18n":

    default:
    // TODO: add instructions here.
  }
}

export default FormHelperOptions;
