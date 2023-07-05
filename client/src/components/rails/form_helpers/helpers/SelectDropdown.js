import React, { useState, useEffect, useContext } from "react";
import TextFieldWithLabel from "../../../form/TextFieldWithLabel";
import AddKeyValuePair from "../../../form/AddKeyValueTextPair";
import { FormHelperContext } from "../../../../contexts/FormHelperProvider";
import HtmlOptions from "./options/HtmlOptions";
import { SELECT_DROPDOWN_HTML_OPTION_FILEDS } from "../constants";
import DataOptions from "./options/DataOptions";

function SelectDropdown() {
  const {
    bindToObject,
    objectName,
    htmlOptions,
    dataOptions,
    formVariableName,
    setDataOptions,
    setFormVariableName,
    setObjectName,
    setHtmlOptions,
    setCode,
    handleHtmlDataKeyChange,
    handleHtmlDataValueChange,
    handleAddHtmlDataPair,
    handleHtmlOptionsChange,
    handleFormVariableNameChange,
  } = useContext(FormHelperContext);
  const [optionsName, setOptionsName] = useState("Post.pluck(:title, :id)");
  // multiple, size,

  // disabled

  useEffect(() => {
    if (objectName === null) setObjectName(":post_id");
    generateCodeForOptions();
  }, [
    objectName,
    htmlOptions,
    optionsName,
    dataOptions,
    formVariableName,
    bindToObject,
  ]);

  const handleOptionsNameChange = (event) => {
    const newOptionsName = { ...optionsName };
    newOptionsName[event.target.name] = event.target.value;
    setOptionsName(newOptionsName);
  };

  const handleObjectNameChange = (event) => {
    const value = event.target.value;
    if (!value) {
      setObjectName(":post_id");
    } else {
      setObjectName(value);
    }
  };

  const generateCodeForOptions = () => {
    let options = [
      `, ${optionsName}`,
      generateHtmlOptionsString(),
      generateDataOptionsString(),
    ];
    options = options.filter((item) => item !== "").join("");
    let formCode = "";
    if (bindToObject) {
      formCode = `${formVariableName}.select(${objectName}${options})`;
    } else {
      formCode = `select_tag(${objectName}${options})`;
    }
    setCode(formCode);
  };

  const generateDataOptionsString = () => {
    if (areAllValuesEmpty(dataOptions)) return "";

    let components = [];
    for (const index in dataOptions) {
      const item = dataOptions[index];
      if (item && item.key && item.value) {
        components.push(`${item.key}: '${item.value}'`);
      }
    }

    return `, data: { ${components.join(", ")} }`;
  };

  const generateHtmlOptionsString = () => {
    if (areAllValuesEmpty(htmlOptions)) return "";

    let components = [];
    for (const key in htmlOptions) {
      if (htmlOptions[key] !== "") {
        components.push(`${key}: '${htmlOptions[key]}'`);
      }
    }

    return `, ${components.join(", ")}`;
  };

  const areAllValuesEmpty = (obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key) && obj[key] !== "") {
        return false;
      }
    }
    return true;
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h3>Select Dropdown Helper Generator</h3>
        <TextFieldWithLabel
          name="html-name"
          label="HTML Form Name"
          placeholder=":post_id"
          handleChange={handleObjectNameChange}
        />
        <TextFieldWithLabel
          name="form-variable-name"
          label="Form Variable name"
          placeholder="form"
          handleChange={handleFormVariableNameChange}
        />
      </div>
      <HtmlOptions
        fields={SELECT_DROPDOWN_HTML_OPTION_FILEDS}
        handleChange={handleHtmlOptionsChange}
      />
      <DataOptions />
    </div>
  );
}

export default SelectDropdown;
