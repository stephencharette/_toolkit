import React from "react";
import { useState } from "react";
import GeneratorTypeSelector from "./GeneratorTypeSelector";
import Result from "./Result";
import GeneratorOptions from "./GeneratorOptions";
import * as Constants from "../../../constants/rails/index.js";

function Generators() {
  const defaults = Constants.DEFAULTS["state"];
  const [generator, setGenerator] = useState(defaults["generator"]);
  const [name, setName] = useState(defaults["name"]);
  const [actions, setActions] = useState(defaults["actions"]);
  const [options, setOptions] = useState(defaults["options"]);
  const [fieldPairs, setFieldPairs] = useState(defaults["fieldPairs"]);

  const handleGeneratorSelect = (type) => {
    setGenerator(type);
    setOptions(defaults["options"]);
    setName(defaults["name"]);
    setActions(defaults["actions"]);
    setFieldPairs(defaults["fieldPairs"]);
  };

  const handleOptionPairTextChange = (event, index) => {
    const value = event.target.value;
    setFieldPairs((previousPairs) => {
      const updatedPairs = [...previousPairs];
      updatedPairs[index].field = value;
      return updatedPairs;
    });
  };

  const handleOptionPairSelectChange = (event, index) => {
    const value = event.target.value;
    setFieldPairs((previousPairs) => {
      const updatedPairs = [...previousPairs];
      if (value === Constants.DATA_TYPE_OPTIONS[0].label) {
        updatedPairs[index].fieldType = "";
      } else {
        updatedPairs[index].fieldType = value;
      }

      return updatedPairs;
    });
  };

  const handleAddOptionPair = () => {
    setFieldPairs((previousOptions) => [
      ...previousOptions,
      { field: "", fieldType: "" },
    ]);
  };

  const handleAddAction = () => {
    setActions((previousActions) => [...previousActions, ""]);
  };

  const handleActionChange = (event, index) => {
    const inputType = event.target.type;
    if (inputType === "checkbox") {
      const { name, checked } = event.target;
      if (checked) {
        setActions([...actions, name]);
      } else {
        const updatedActions = actions.filter((item) => item !== name);
        setActions(updatedActions);
      }
    } else if (inputType === "text") {
      const value = event.target.value;
      setActions((previousActions) => {
        if (value === "") return previousActions;

        const updatedActions = [...previousActions];
        updatedActions[index] = value;

        return updatedActions;
      });
    }
  };

  const handleNameChange = (event) => {
    const updatedName = event.target.value;
    if (updatedName === "") return setName(defaults["generator"]);

    setName(event.target.value);
  };

  const handleOptionsChange = (event) => {
    const inputType = event.target.type;
    if (inputType === "text") {
      const { name, value } = event.target;

      const index = options.findIndex((value) => RegExp(name).test(value));
      const newOption = `${name}${value}`;

      if (index === -1) {
        return setOptions([...options, newOption]);
      }

      let newOptions = [...options];
      newOptions.splice(index);

      if (value === "") {
        return setOptions(newOptions);
      }

      return setOptions([...newOptions, newOption]);
    } else if (inputType === "checkbox") {
      const { name, checked } = event.target;
      if (checked) {
        setOptions([...options, name]);
      } else {
        const updatedItems = options.filter((item) => item !== name);
        setOptions(updatedItems);
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col space-y-5 mb-72">
        <GeneratorTypeSelector
          generator={generator}
          handleSelect={handleGeneratorSelect}
        />

        <GeneratorOptions
          generator={generator}
          handleNameChange={handleNameChange}
          handleOptionsChange={handleOptionsChange}
          handleOptionPairSelectChange={handleOptionPairSelectChange}
          handleOptionPairTextChange={handleOptionPairTextChange}
          handleAddOptionPair={handleAddOptionPair}
          fieldPairs={fieldPairs}
          handleAddAction={handleAddAction}
          handleActionChange={handleActionChange}
          actions={actions}
        />
      </div>

      <Result
        command={[
          "rails generate",
          `${generator}`,
          `${name}`,
          `${actions.join(" ")}`,
          `${fieldPairs
            .filter((pair) => pair.field !== "")
            .map((pair) => `${pair.field}:${pair.fieldType}`)
            .join(" ")}`,
          `${options.join(" ")}`,
        ].join(" ")}
      />
    </div>
  );
}

export default Generators;
