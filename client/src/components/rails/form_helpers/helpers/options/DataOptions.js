import React, { useContext } from "react";
import TextFieldWithLabel from "../../../../form/TextFieldWithLabel";
import AddKeyValuePair from "../../../../form/AddKeyValueTextPair";
import Toggle from "../../../../form/Toggle";
import { FormHelperContext } from "../../../../../contexts/FormHelperProvider";

const componentMap = {
  TextFieldWithLabel,
  Toggle,
};

function DataOptions() {
  const {
    dataOptions,
    handleAddHtmlDataPair,
    handleHtmlDataKeyChange,
    handleHtmlDataValueChange,
  } = useContext(FormHelperContext);

  return (
    <div className="flex flex-col space-y-2">
      <h3>Data options</h3>
      <AddKeyValuePair
        pairs={dataOptions}
        handleAddPair={handleAddHtmlDataPair}
        handleKeyChange={handleHtmlDataKeyChange}
        handleValueChange={handleHtmlDataValueChange}
      />
    </div>
  );
}

export default DataOptions;
