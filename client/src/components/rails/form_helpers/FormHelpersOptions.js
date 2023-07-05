import React, { useContext } from "react";
import Form from "./helpers/Form";
import SelectDropdown from "./helpers/SelectDropdown";
import { FormHelperContext } from "../../../contexts/FormHelperProvider";

function FormHelperOptions() {
  const { formHelper } = useContext(FormHelperContext);

  switch (formHelper) {
    case "form":
      return <Form />;
    case "select_dropdown":
      return <SelectDropdown />;
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
