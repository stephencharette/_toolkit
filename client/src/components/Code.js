import React, { useState, useContext } from "react";
import useDarkSide from "./hooks/useDarkSide";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";
import * as Constants from "../constants/code.js";
import axios from "../config/axios";
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
  const [inError, setInError] = useState(false);
  const [title, setTitle] = useState(codeSnippet.title);

  const handleOnMount = async (event) => {
    if (codeSnippetId !== "new") return;

    const value = "Your code here.";
    try {
      const result = await axios({
        method: "post",
        url: `/users/${userId}/code_snippets/?code=${encodeURIComponent(
          value
        )}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      });

      handleAddCodeSnippet({
        code: value,
        documentId: result.data.documentId,
      });
    } catch (error) {
      setInError(true);
    }
  };

  const handleTitleChange = async (event) => {
    const value = event.target.value;
    if (value === title || !value) return;
    setTitle(value);
    try {
      const result = await axios({
        method: "patch",
        url: `/users/${userId}/code_snippets/${codeSnippetId}?title=${encodeURIComponent(
          value
        )}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      });
      // TODO: add rescue block here...
    } catch (error) {
      setInError(true);
    }
  };
  // TODO: make constant or something...

  const handleLanguageChange = async (event) => {
    const value = event.target.value;
    const label = event.target.name;
    if (value === language || !value) return;
    setLanguage(value);
    // setDropdownIsHidden(true);
    try {
      const result = await axios({
        method: "patch",
        url: `/users/${userId}/code_snippets/${codeSnippetId}?lang=${encodeURIComponent(
          value
        )}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      });
      // TODO: add rescue block here...
    } catch (error) {
      setInError(true);
    }
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
        url: `/users/${userId}/code_snippets/${codeSnippetId}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      });
    }
  };

  const handleCodeChange = async (value, event) => {
    if (value === code || !value) return;
    setCode(value);
    try {
      const result = await axios({
        method: "patch",
        url: `/users/${userId}/code_snippets/${codeSnippetId}?code=${encodeURIComponent(
          value
        )}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      });
    } catch (error) {
      setInError(true);
    }
  };

  return (
    // TODO: add title here...
    <div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Nickname"
          onChange={handleTitleChange}
          defaultValue={title}
        ></input>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="font-mono w-40"
        >
          <option value="">Select language</option>
          {languageOptions.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={handleDestroy}
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-1 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
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
      {/* TODO: colorTheme reload this element when changed... */}
      {/* TODO: have user be able to choose code theme. */}

      <Editor
        height="7rem"
        language={language}
        defaultValue={code}
        onChange={handleCodeChange}
        theme={colorTheme === "dark" ? "light" : "vs-dark"}
        onMount={handleOnMount}
      />
      {inError === true && (
        <div className="flex items-center space-x-2 mt-1">
          <span className="sr-only">Red circle</span>
          <span className="flex w-2.5 h-2.5 bg-red-500 rounded-full"></span>
          <p className="dark:text-gray-200 font-semibold text-sm text-gray-800">
            Could not save...
          </p>
        </div>
      )}
    </div>
  );
}

export default Code;
