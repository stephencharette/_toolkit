import React, { useContext } from "react";
import FormHelpersTypeSelector from "./FormHelpersTypeSelector";
import FormHelpersOptions from "./FormHelpersOptions";
import Toggle from "../../form/Toggle";
import Info from "../../Info";
import Code from "../../Code";
import Editor, { loader } from "@monaco-editor/react";
import { Check, DocumentDuplicateOutline } from "heroicons-react";
import Result from "../../Result";
import { FormHelperContext } from "../../../contexts/FormHelperProvider";

function FormHelpers() {
  const { formHelper, code, bindToObject, handleBindToObjectChange } =
    useContext(FormHelperContext);

  return (
    <div>
      <div className="flex flex-col space-y-5 mb-72">
        <FormHelpersTypeSelector />

        {formHelper && (
          <div>
            <Info
              srLabel="Bind to object info"
              label="Form helpers can either be bound to objects, or set as tags. i.e. `form_tag` vs form_for ... do; end"
            />
            <Toggle
              name={"bind-to-object"}
              checked={bindToObject}
              label={"Bind View Helper To Object?"}
              handleChange={handleBindToObjectChange}
            />
          </div>
        )}

        <FormHelpersOptions />

        <Result
          srLabel="Your generated form helper"
          buttonLabel="Copy"
          command={code}
        />
      </div>
    </div>
  );
}

export default FormHelpers;
