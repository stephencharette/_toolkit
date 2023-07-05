import React, { useState, useEffect, useContext } from "react";
import TextFieldWithLabel from "../../../form/TextFieldWithLabel";
import { FormHelperContext } from "../../../../contexts/FormHelperProvider";
import { FORM_HTML_OPTION_FILEDS, URL_OPTION_FILEDS } from "../constants";
import HtmlOptions from "./options/HtmlOptions";
import UrlOptions from "./options/UrlOptions";
import DataOptions from "./options/DataOptions";

function Form() {
  const {
    bindToObject,
    htmlOptions,
    urlOptions,
    dataOptions,
    formVariableName,
    objectName,
    handleFormVariableNameChange,
    handleHtmlOptionsChange,
    handleUrlOptionsChange,
    handleObjectNameChange,
    setDataOptions,
    setObjectName,
    setCode,
  } = useContext(FormHelperContext);
  const [formPathName, setFormPathName] = useState("path");

  useEffect(() => {
    if (objectName === null) setObjectName("@object");
    generateCodeForOptions();
  }, [
    objectName,
    htmlOptions,
    urlOptions,
    dataOptions,
    formVariableName,
    formPathName,
    bindToObject,
  ]);

  const handleFormPathNameChange = (event) => {
    const value = event.target.value;

    setFormPathName(value || "path");
  };

  const generateCodeForOptions = () => {
    let options = [
      generateHtmlOptionsString(),
      generateUrlOptionsString(),
      generateDataOptionsString(),
    ];
    options = options.filter((item) => item !== "").join("");

    let formCode = "";
    if (bindToObject === true) {
      formCode = `form_for ${objectName}${options} do |${formVariableName}|`;
    } else {
      formCode = `form_tag(${formPathName}${options})`;
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

    if (bindToObject) return `, html: { ${components.join(", ")} }`;

    return `, ${components.join(", ")}`;
  };

  const generateUrlOptionsString = () => {
    if (areAllValuesEmpty(urlOptions)) return "";

    let components = [];
    for (const key in urlOptions) {
      if (urlOptions[key] !== "") {
        components.push(`${key}: '${urlOptions[key]}'`);
      }
    }

    if (bindToObject) return `, url: { ${components.join(", ")} }`;

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

  const handleHtmlDataKeyChange = (event, index) => {
    const newDataOptions = [...dataOptions];
    newDataOptions[index] = {
      key: event.target.value,
      value: newDataOptions[index].value,
    };
    setDataOptions(newDataOptions);
  };

  const handleHtmlDataValueChange = (event, index) => {
    const newDataOptions = [...dataOptions];
    newDataOptions[index] = {
      key: newDataOptions[index].key,
      value: event.target.value,
    };
    setDataOptions(newDataOptions);
  };

  const handleAddHtmlDataPair = () => {
    setDataOptions((previousOptions) => [
      ...previousOptions,
      { key: "", value: "" },
    ]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col space-y-2">
        <h3>Form Helper Generator</h3>
        {bindToObject ? (
          <div className="space-y-2">
            <TextFieldWithLabel
              name="object-name"
              label="Object"
              placeholder="@object"
              handleChange={handleObjectNameChange}
            />
            <TextFieldWithLabel
              name="form-variable-name"
              label="Form Variable name"
              placeholder="form"
              handleChange={handleFormVariableNameChange}
            />
          </div>
        ) : (
          <TextFieldWithLabel
            name="form-path-name"
            label="Form Path"
            placeholder="`search_path` or `/search`"
            handleChange={handleFormPathNameChange}
          />
        )}
      </div>
      <HtmlOptions
        fields={FORM_HTML_OPTION_FILEDS}
        handleChange={handleHtmlOptionsChange}
      />
      <UrlOptions
        fields={URL_OPTION_FILEDS}
        handleChange={handleUrlOptionsChange}
      />
      <DataOptions />
    </div>
  );
}

export default Form;
