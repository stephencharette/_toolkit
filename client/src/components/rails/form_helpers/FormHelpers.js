import React, { useState } from "react";
import FormHelpersTypeSelector from "./FormHelpersTypeSelector";
import FormHelpersOptions from "./FormHelpersOptions";
import Code from "../../Code";
import Editor, { loader } from "@monaco-editor/react";
import { Check, DocumentDuplicateOutline } from "heroicons-react";

function FormHelpers() {
  const [formHelper, setFormHelper] = useState(null);
  const [code, setCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);

  const handleFormHelperSelect = (value) => {
    setFormHelper(value);
  };

  const handleCopy = (event) => {
    event.preventDefault();
    copyTextToClipboard(code)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch((error) => {
        // TODO: handle error here...
      });
  };

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCodeChange = (value) => {
    setCode(value);
  };

  return (
    <div>
      <div className="flex flex-col space-y-5 mb-72">
        <FormHelpersTypeSelector handleSelect={handleFormHelperSelect} />

        <FormHelpersOptions
          formHelper={formHelper}
          handleCodeChange={handleCodeChange}
        />

        <form className="fixed inset-x-0 bottom-0 px-4 drop-shadow-xl sm:ml-52 pr-30 xl:mx-auto max-w-4xl">
          <div className="w-full border border-gray-200 rounded-b-none rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
            <div className="px-4 pt-2 bg-white rounded-t-lg dark:bg-gray-800">
              <label htmlFor="command" className="sr-only">
                Your generated command
              </label>
              <div className="relative group">
                <Editor
                  height="9rem"
                  language="ruby"
                  value={code}
                  onChange={handleCodeChange}
                  // onMount={handleOnMount}
                  className="relative"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="text-gray-900 group-hover:block hidden absolute bottom-2 right-20 md:right-24 lg:right-28 ml-auto hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-1 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
                >
                  {isCopied ? (
                    <Check width={20} height={20} />
                  ) : (
                    <DocumentDuplicateOutline width={20} height={20} />
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormHelpers;
