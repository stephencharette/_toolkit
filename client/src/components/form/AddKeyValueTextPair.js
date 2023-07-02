import React from "react";
import KeyValueTextPair from "./KeyValueTextPair";
// import * as Constants from "../../../../../constants/rails/index.js";

function AddKeyValuePair({
  label,
  pairs,
  handleKeyChange,
  handleValueChange,
  handleAddPair,
}) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="controller-actions">{label}</label>
      <fieldset className="ml-2 space-y-2">
        {pairs.map((pair, index) => (
          <KeyValueTextPair
            key={index}
            keyValue={pair.field}
            value={pair.fieldType}
            index={index}
            handleKeyChange={handleKeyChange}
            handleValueChange={handleValueChange}
          />
        ))}
      </fieldset>
      <button
        type="button"
        className="small w-10 ml-auto"
        onClick={handleAddPair}
      >
        +
      </button>
      {/* TODO: add way to remove! */}
    </div>
  );
}

export default AddKeyValuePair;
