import React, { useState, useContext } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import * as Constants from "../constants/code.js";
import axios from "axios";
import { UserContext } from "../UserContext.js";
import SearchDropdown from "./form/SearchDropdown.js";

function Code({ codeSnippetId, codeSnippet }) {
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
    const serverUrl = "http://localhost:3001";
    const result = await axios({
      method: "patch",
      url: `${serverUrl}/users/${userId}/code_snippets/${codeSnippetId}?lang=${value}`,
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

  const handleCodeChange = async (event) => {
    const value = event.target.value;
    setCode(value);
    const serverUrl = "http://localhost:3001";
    const result = await axios({
      method: "patch",
      url: `${serverUrl}/users/${userId}/code_snippets/${codeSnippetId}?code=${encodeURIComponent(
        value
      )}`,
      headers: {
        "Access-Control-Allow-Origin": "*",
        Authorization: authToken,
      },
    });
  };

  return (
    <div>
      <select
        value={language}
        onChange={handleLanguageChange}
        className="font-mono"
      >
        {languageOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* <SearchDropdown
        selected={language}
        options={}
        handleClick={handleDropdownClick}
        handleSearch={handleDropdownSearch}
        handleChange={handleLanguageChange}
        isHidden={dropdownIsHidden}
        setIsHidden={setDropdownIsHidden}
      /> */}

      <CodeEditor
        value={code}
        language={language}
        placeholder=""
        onBlur={handleCodeChange}
        padding={15}
        style={{
          fontSize: 14,
          backgroundColor: "#1e293b",
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
