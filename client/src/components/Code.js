import React, { useState } from "react";
import CodeEditor from "@uiw/react-textarea-code-editor";
import * as Constants from "../constants/code.js";

function Code() {
  const [code, setCode] = useState(`class Cm::Competency;\n\n\end`);
  const [language, setLanguage] = useState("");

  const languageOptions = Constants.LANGUAGE_OPTIONS;

  const handleLanguageChange = (event) => {
    const value = event.target.value;
    setLanguage(value);
  };

  return (
    <div>
      <select onChange={handleLanguageChange} className="font-mono">
        {languageOptions.map((option, index) => (
          <option
            key={index}
            defaultValue={index === 0 ? "selected" : ""}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      <CodeEditor
        value={code}
        language={language}
        placeholder=""
        onChange={(evn) => setCode(evn.target.value)}
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
