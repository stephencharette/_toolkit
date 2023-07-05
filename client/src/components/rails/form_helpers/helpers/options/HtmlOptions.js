import React from "react";
import TextFieldWithLabel from "../../../../form/TextFieldWithLabel";
import Toggle from "../../../../form/Toggle";

const componentMap = {
  TextFieldWithLabel,
  Toggle,
};
function HtmlOptions({ fields, handleChange }) {
  return (
    <div className="flex flex-col space-y-2">
      <h3>HTML Options</h3>
      {fields.map((option, index) => {
        const Component = componentMap[option.type];

        return (
          <Component
            key={index}
            name={option.name}
            label={option.label}
            handleChange={handleChange}
          />
        );
      })}
    </div>
  );
}

export default HtmlOptions;
