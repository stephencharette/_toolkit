import React, { useState, useContext } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import * as Constants from "../constants/code.js";
import axios from "axios";
import { UserContext } from "../UserContext.js";

function Code({ codeSnippetId, codeSnippet }) {
  const { userId, authToken } = useContext(UserContext);
  const [code, setCode] = useState(codeSnippet.code.replace(/\\n/g, "\n"));
  const [language, setLanguage] = useState(codeSnippet.lang);

  const languageOptions = Constants.LANGUAGE_OPTIONS;

  const handleLanguageChange = async (event) => {
    const value = event.target.value;
    setLanguage(value);
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

  const handleCodeChange = async (event) => {
    const value = event.target.value;
    console.log(value);
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
