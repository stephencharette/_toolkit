import React, { useState, useContext } from "react";
import useDarkSide from "./hooks/useDarkSide";
import CodeEditor from "@uiw/react-textarea-code-editor";
import * as Constants from "../constants/code.js";
import axios from "axios";
import { UserContext } from "../UserContext.js";
import SearchDropdown from "./form/SearchDropdown.js";
import { Trash } from "heroicons-react";

function Code({
  codeSnippetId,
  codeSnippet,
  handleAddCodeSnippet,
  handleDestroyCodeSnippet,
}) {
  const [colorTheme, setTheme] = useDarkSide();
  const allLanguageOptions = Constants.LANGUAGE_OPTIONS;

  const { userId, authToken } = useContext(UserContext);
  const [code, setCode] = useState(codeSnippet.code.replace(/\\n/g, "\n"));
  const [language, setLanguage] = useState(codeSnippet.lang);
  // const [dropdownIsHidden, setDropdownIsHidden] = useState(true);
  const [languageOptions, setLanguageOptions] = useState(allLanguageOptions);

  const handleLanguageChange = async (event) => {
    const value = event.target.value;
    const label = event.target.name;
    setLanguage(value);
    // setDropdownIsHidden(true);
    const result = await axios({
      method: "patch",
      url: `${process.env.REACT_APP_HOST}/users/${userId}/code_snippets/${codeSnippetId}?lang=${value}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: authToken,
      },
    });
  };

  // const handleDropdownClick = () => {
  //   setDropdownIsHidden(!dropdownIsHidden);
  // };

  // const handleDropdownSearch = (event) => {
  //   const search = event.target.value;
  //   if (search) {
  //     const filteredOptions = languageOptions.filter((item) =>
  //       item.label.toLowerCase().includes(search.toLowerCase())
  //     );
  //     setLanguageOptions(filteredOptions);
  //   } else {
  //     setLanguageOptions(allLanguageOptions);
  //   }
  // };

  const handleDestroy = async () => {
    // TODO: better alert box!
    if (window.confirm("Are you sure you want to delete this item?")) {
      handleDestroyCodeSnippet(codeSnippetId);

      const result = await axios({
        method: "delete",
        url: `${process.env.REACT_APP_HOST}/users/${userId}/code_snippets/${codeSnippetId}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      });
    }
  };

  const handleCodeChange = async (event) => {
    const value = event.target.value;
    setCode(value);
    if (codeSnippetId === "new") {
      const result = await axios({
        method: "post",
        url: `${
          process.env.REACT_APP_HOST
        }/users/${userId}/code_snippets/?code=${encodeURIComponent(value)}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      });

      handleAddCodeSnippet({ code: value, documentId: result.data.documentId });
    } else {
      const result = await axios({
        method: "patch",
        url: `${
          process.env.REACT_APP_HOST
        }/users/${userId}/code_snippets/${codeSnippetId}?code=${encodeURIComponent(
          value
        )}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      });
    }
  };

  return (
    // TODO: add title here...
    <div>
      <div className="flex items-center">
        <select
          value={language}
          onChange={handleLanguageChange}
          className="font-mono"
        >
          <option value="">Select a language</option>
          {languageOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleDestroy}
          class="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-1 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          <Trash width={14} height={14} />
        </button>
      </div>

      {/* <SearchDropdown
        selected={language}
        options={}
        handleClick={handleDropdownClick}
        handleSearch={handleDropdownSearch}
        handleChange={handleLanguageChange}
        isHidden={dropdownIsHidden}
        setIsHidden={setDropdownIsHidden}
      /> */}

      {/* TODO: add saving... label */}
      {/* TODO: colorTheme reload this element when changed... */}
      <CodeEditor
        value={code}
        language={language}
        placeholder=""
        onBlur={handleCodeChange}
        padding={15}
        data-color-mode={colorTheme === "dark" ? "light" : "dark"}
        style={{
          fontSize: 14,
          // backgroundColor: "#1e293b",
          borderRadius: "10px",
          borderStyle: "solid",
          border: "1px",
          borderColor: "#4b5563",
          fontFamily:
            "ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace",
        }}
      />
    </div>
  );
}

export default Code;
