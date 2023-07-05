import React, { useState, createContext } from "react";
import {
  DEFAULT_HTML_OPTIONS,
  DEFAULT_URL_OPTIONS,
} from "../components/rails/form_helpers/constants";
export const FormHelperContext = createContext();

export const FormHelperProvider = ({ children }) => {
  const [formHelper, setFormHelper] = useState(null);
  const [code, setCode] = useState("");
  const [bindToObject, setBindToObject] = useState(true);
  const [objectName, setObjectName] = useState(null);
  const [htmlOptions, setHtmlOptions] = useState(DEFAULT_HTML_OPTIONS);
  const [urlOptions, setUrlOptions] = useState({
    method: "",
    action: "",
    controller: "",
  });
  const [dataOptions, setDataOptions] = useState([]);
  const [formVariableName, setFormVariableName] = useState("form");

  const handleFormHelperSelect = (value) => {
    resetFormValues();
    setFormHelper(value);
  };

  const handleBindToObjectChange = (event) => {
    const { checked } = event.target;
    setBindToObject(checked);
  };

  const resetFormValues = () => {
    setHtmlOptions(DEFAULT_HTML_OPTIONS);
    setUrlOptions(DEFAULT_URL_OPTIONS);
    setObjectName(null);
  };

  const handleUrlOptionsChange = (event) => {
    const newUrlOptions = { ...urlOptions };
    newUrlOptions[event.target.name] = event.target.value;
    setUrlOptions(newUrlOptions);
  };

  const handleObjectNameChange = (event) => {
    const value = event.target.value;
    setObjectName(value || "@object");
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

  const handleHtmlOptionsChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newHtmlOptions = { ...htmlOptions };
    switch (type) {
      case "checkbox":
        newHtmlOptions[name] = checked || "";
        break;
      default:
        newHtmlOptions[name] = value;
        break;
    }
    setHtmlOptions(newHtmlOptions);
  };

  const handleFormVariableNameChange = (event) => {
    const value = event.target.value;
    setFormVariableName(value || "form");
  };

  return (
    <FormHelperContext.Provider
      value={{
        formHelper,
        code,
        bindToObject,
        objectName,
        htmlOptions,
        dataOptions,
        formVariableName,
        urlOptions,
        setDataOptions,
        setFormVariableName,
        setObjectName,
        setHtmlOptions,
        setUrlOptions,
        setCode,
        setFormHelper,
        setBindToObject,
        handleFormHelperSelect,
        handleBindToObjectChange,
        handleHtmlOptionsChange,
        handleHtmlDataKeyChange,
        handleHtmlDataValueChange,
        handleAddHtmlDataPair,
        handleFormVariableNameChange,
        handleUrlOptionsChange,
        handleObjectNameChange,
      }}
    >
      {children}
    </FormHelperContext.Provider>
  );
};
