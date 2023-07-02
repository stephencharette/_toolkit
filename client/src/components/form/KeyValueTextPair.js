import React from "react";

function KeyValueTextPair({
  handleKeyChange,
  handleValueChange,
  name,
  index,
  keyValue,
  value,
}) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        name={`${name}-${index}`}
        value={keyValue}
        placeholder="key"
        onChange={(event) => handleKeyChange(event, index)}
      ></input>
      <input
        type="text"
        name={`${name}-${index}`}
        value={value}
        placeholder="value"
        onChange={(event) => handleValueChange(event, index)}
      ></input>
    </div>
  );
}

export default KeyValueTextPair;
