import React, { useState, useEffect } from "react";
import TextFieldWithLabel from "../../../form/TextFieldWithLabel";
import AddKeyValuePair from "../../../form/AddKeyValueTextPair";

function Form({ handleCodeChange }) {
  const [fieldPairs, setFieldPairs] = useState([]);
  const [objectName, setObjectName] = useState("@object");
  const [htmlOptions, setHtmlOptions] = useState({
    class: "",
    id: "",
  });
  const [dataOptions, setDataOptions] = useState([]);
  const [urlOptions, setUrlOptions] = useState({
    method: "",
    action: "",
  });
  const [formVariableName, setFormVariableName] = useState("form");

  useEffect(() => {
    generateCodeForOptions();
  }, [objectName, htmlOptions, urlOptions, dataOptions, formVariableName]);

  const handleHtmlOptionsChange = (event) => {
    const newHtmlOptions = { ...htmlOptions };
    newHtmlOptions[event.target.name] = event.target.value;
    setHtmlOptions(newHtmlOptions);
  };

  const handleUrlOptionsChange = (event) => {
    const newUrlOptions = { ...urlOptions };
    newUrlOptions[event.target.name] = event.target.value;
    setUrlOptions(newUrlOptions);
  };

  const handleObjectNameChange = (event) => {
    const value = event.target.value;
    if (!value) {
      setObjectName("@object");
    } else {
      setObjectName(value);
    }
  };

  const handleFormVariableNameChange = (event) => {
    const value = event.target.value;
    if (!value) {
      setFormVariableName("form");
    } else {
      setFormVariableName(value);
    }
  };

  const generateCodeForOptions = () => {
    let options = [
      generateHtmlOptionsString(),
      generateUrlOptionsString(),
      generateDataOptionsString(),
    ];
    options = options.filter((item) => item !== "").join("");
    const formCode = `form_for ${objectName}${options} do |${formVariableName}|`;
    handleCodeChange(formCode);
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

    return `, html: { ${components.join(", ")} }`;
  };

  const generateUrlOptionsString = () => {
    if (areAllValuesEmpty(urlOptions)) return "";

    let components = [];
    for (const key in urlOptions) {
      if (urlOptions[key] !== "") {
        components.push(`${key}: '${urlOptions[key]}'`);
      }
    }

    return `, url: { ${components.join(", ")} }`;
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
      <div className="flex flex-col space-y-2">
        <h3>HTML Options</h3>
        <TextFieldWithLabel
          name="id"
          label="Id"
          handleChange={handleHtmlOptionsChange}
        />
        <TextFieldWithLabel
          name="class"
          label="Classes"
          handleChange={handleHtmlOptionsChange}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <h3>URL Options</h3>
        <TextFieldWithLabel
          name="method"
          label="Method"
          placeholder="get"
          handleChange={handleUrlOptionsChange}
        />
        <TextFieldWithLabel
          name="action"
          label="Action"
          handleChange={handleUrlOptionsChange}
        />
      </div>
      <div className="flex flex-col space-y-2">
        <h3>Data options</h3>
        <AddKeyValuePair
          pairs={dataOptions}
          handleAddPair={handleAddHtmlDataPair}
          handleKeyChange={handleHtmlDataKeyChange}
          handleValueChange={handleHtmlDataValueChange}
        />
      </div>
    </div>
  );
}

export default Form;
