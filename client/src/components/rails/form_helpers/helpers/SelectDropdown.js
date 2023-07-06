import React, { useState, useEffect, useContext } from "react";
import TextFieldWithLabel from "../../../form/TextFieldWithLabel";
import { FormHelperContext } from "../../../../contexts/FormHelperProvider";
import OptionsWithHeading from "./options/OptionsWithHeading";
import DataOptions from "./options/DataOptions";
import {
  SELECT_DROPDOWN_HTML_OPTION_FILEDS,
  SELECT_DROPDOWN_OPTION_FIELDS,
} from "../constants";

function SelectDropdown() {
  const {
    bindToObject,
    objectName,
    htmlOptions,
    dataOptions,
    formVariableName,
    setObjectName,
    setCode,
    handleHtmlOptionsChange,
    handleFormVariableNameChange,
  } = useContext(FormHelperContext);
  const [dropdownChoices, setDropdownChoices] = useState(
    `[["Learn Ruby on Rails", "13"], ["Rubocop Rails", "25"]]`
  );
  const [dropdownOptions, setDropdownOptions] = useState({});
  const [selectedDropdownOption, setSelectedDropdownOption] = useState(null);

  useEffect(() => {
    if (objectName === null) setObjectName(":post_id");
    generateCodeForOptions();
  }, [
    objectName,
    htmlOptions,
    dropdownChoices,
    dropdownOptions,
    dataOptions,
    formVariableName,
    bindToObject,
    selectedDropdownOption,
  ]);

  const handleObjectNameChange = (event) => {
    const value = event.target.value;
    setObjectName(value || ":post_id");
  };

  const handleDropdownOptionsChange = (event) => {
    const { name, value } = event.target;
    const newDropdownOptions = { ...dropdownOptions };
    newDropdownOptions[name] = value;
    setDropdownOptions(newDropdownOptions);
  };

  const handleDropdownChoicesChange = (event) => {
    const value = event.target.value;
    setDropdownChoices(
      value || `[["Learn Ruby on Rails", "13"], ["Rubocop Rails", "25"]]`
    );
  };

  const generateDropdownChoicesString = () => {
    return `, options_for_select(${dropdownChoices}${
      selectedDropdownOption ? `, ${selectedDropdownOption}` : ""
    })`;
  };

  const generateDropdownOptionsString = () => {
    let components = [];
    for (const key in dropdownOptions) {
      if (dropdownOptions[key] !== "") {
        components.push(`${key}: '${dropdownOptions[key]}'`);
      }
    }

    console.log();

    if (bindToObject) {
      return `, { ${components.join(", ")} }`;
    }

    return `, ${components.join(", ")}`;
  };

  const generateCodeForOptions = () => {
    let options = [
      generateDropdownChoicesString(),
      generateDropdownOptionsString(),
      generateHtmlOptionsString(),
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

    if (bindToObject) {
      return `, { ${components.join(", ")}${generateDataOptionsString()} }`;
    }

    return `, ${components.join(", ")} ${generateDataOptionsString()}`;
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
        {bindToObject === true && (
          <TextFieldWithLabel
            name="form-variable-name"
            label="Form Variable name"
            placeholder="form"
            handleChange={handleFormVariableNameChange}
          />
        )}
        {/* TODO: add option to chose between options for select and collection select... */}
        <TextFieldWithLabel
          name="options"
          label="Dropdown Options"
          placeholder={`[["Learn Ruby on Rails", "13"], ["Rubocop Rails", "25"]]`}
          handleChange={handleDropdownChoicesChange}
        />
        <TextFieldWithLabel
          name="selected"
          label="Selected Option"
          placeholder={`The option that is selected on default.`}
          handleChange={(event) =>
            setSelectedDropdownOption(event.target.value || null)
          }
        />
        {/* setSelectedDropdownOption */}
      </div>
      {/* TODO: add tooltips to some funky options... */}
      <OptionsWithHeading
        header="Dropdown Options"
        fields={SELECT_DROPDOWN_OPTION_FIELDS}
        handleChange={handleDropdownOptionsChange}
      />
      <OptionsWithHeading
        header="HTML Options"
        fields={SELECT_DROPDOWN_HTML_OPTION_FILEDS}
        handleChange={handleHtmlOptionsChange}
      />
      <DataOptions />
    </div>
  );
}

export default SelectDropdown;
