import React from "react";
import PrettyRadio from "../../form/PrettyRadio";

function FormHelpersTypeSelector({ handleSelect }) {
  return (
    <div className="flex flex-col text-left space-y-3">
      <h2>What to generate:</h2>
      <ul className="flex flex-wrap gap-x-1 gap-y-2">
        <PrettyRadio
          handleSelect={() => {
            handleSelect("form");
          }}
          name="helper"
          value="form"
          label="Form"
        />
        <div class="relative">
          <PrettyRadio
            handleSelect={() => {
              handleSelect("select_dropdown");
            }}
            name="helper"
            value="select_dropdown"
            label="Select Dropdown"
          />
          <span className="bg-blue-100 absolute -top-1 -right-3 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            SOON
          </span>
        </div>
        <div className="relative">
          <PrettyRadio
            handleSelect={() => {
              handleSelect("text_field");
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
              handleSelect("check_box");
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
              handleSelect("radio");
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
              handleSelect("label");
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
              handleSelect("hidden_field");
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
              handleSelect("fields_for");
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
              handleSelect("collections");
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
              handleSelect("i18n");
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
