import React, { useContext } from "react";
import PrettyRadio from "../../form/PrettyRadio";
import { FormHelperContext } from "../../../contexts/FormHelperProvider";

function FormHelpersTypeSelector() {
  const { handleFormHelperSelect } = useContext(FormHelperContext);
  return (
    <div className="flex flex-col text-left space-y-3">
      <h2>What to generate:</h2>
      <ul className="flex flex-wrap gap-x-1 gap-y-2">
        <PrettyRadio
          handleSelect={() => {
            handleFormHelperSelect("form");
          }}
          name="helper"
          value="form"
          label="Form"
        />
        <div className="relative">
          <PrettyRadio
            handleSelect={() => {
              handleFormHelperSelect("select_dropdown");
            }}
            name="helper"
            value="select_dropdown"
            label="Select Dropdown"
          />
        </div>
        <div className="relative">
          <PrettyRadio
            handleSelect={() => {
              handleFormHelperSelect("text_field");
            }}
            name="helper"
            value="text_field"
            label="Text Field"
          />
          <span className="bg-blue-100 absolute -top-1 -right-3 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            SOON
          </span>
        </div>
        <div className="relative">
          <PrettyRadio
            handleSelect={() => {
              handleFormHelperSelect("check_box");
            }}
            name="helper"
            value="check_box"
            label="Checkbox"
          />
          <span className="bg-blue-100 absolute -top-1 -right-3 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            SOON
          </span>
        </div>
        <div className="relative">
          <PrettyRadio
            handleSelect={() => {
              handleFormHelperSelect("radio");
            }}
            name="helper"
            value="radio"
            label="Radio"
          />
          <span className="bg-blue-100 absolute -top-1 -right-3 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            SOON
          </span>
        </div>
        <div className="relative">
          <PrettyRadio
            handleSelect={() => {
              handleFormHelperSelect("label");
            }}
            name="helper"
            value="label"
            label="Label"
          />
          <span className="bg-blue-100 absolute -top-1 -right-3 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            SOON
          </span>
        </div>
        <div className="relative">
          <PrettyRadio
            handleSelect={() => {
              handleFormHelperSelect("hidden_field");
            }}
            name="helper"
            value="hidden_field"
            label="Hidden Field"
          />
          <span className="bg-blue-100 absolute -top-1 -right-3 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            SOON
          </span>
        </div>
        <div className="relative">
          <PrettyRadio
            handleSelect={() => {
              handleFormHelperSelect("fields_for");
            }}
            name="helper"
            value="fields_for"
            label="Fields For"
          />
          <span className="bg-blue-100 absolute -top-1 -right-3 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            SOON
          </span>
        </div>
        <div className="relative">
          <PrettyRadio
            handleSelect={() => {
              handleFormHelperSelect("collections");
            }}
            name="helper"
            value="collections"
            label="Collections"
          />
          <span className="bg-blue-100 absolute -top-1 -right-3 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            SOON
          </span>
        </div>
        <div className="relative">
          <PrettyRadio
            handleSelect={() => {
              handleFormHelperSelect("i18n");
            }}
            name="helper"
            value="i18n"
            label="I18n"
          />
          <span className="bg-blue-100 absolute -top-1 -right-3 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            SOON
          </span>
        </div>
      </ul>
    </div>
  );
}

export default FormHelpersTypeSelector;
