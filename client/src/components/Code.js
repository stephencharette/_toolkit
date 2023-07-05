import React, { useState, useContext, useEffect } from "react";
import useDarkSide from "./hooks/useDarkSide";
import Editor from "@monaco-editor/react";
import * as Constants from "../constants/code.js";
import axios from "../config/axios";
import { UserContext } from "../contexts/UserContext.js";
import { CopyToClipboardContext } from "../contexts/CopyToClipboardProvider";
import { TrashOutline, DocumentDuplicateOutline, Check } from "heroicons-react";
import { EditorThemeContext } from "../contexts/EditorThemeProvider";

function Code({
  codeSnippetId,
  codeSnippet,
  handleAddCodeSnippet,
  handleDestroyCodeSnippet,
}) {
  const { handleCopy } = useContext(CopyToClipboardContext);
  const { setEditorTheme } = useContext(EditorThemeContext);
  const allLanguageOptions = Constants.LANGUAGE_OPTIONS;

  const { userId, authToken } = useContext(UserContext);
  const [code, setCode] = useState(codeSnippet.code.replace(/\\n/g, "\n"));
  const [language, setLanguage] = useState(codeSnippet.lang);
  const [languageOptions] = useState(allLanguageOptions);
  const [inError, setInError] = useState(false);
  const [title, setTitle] = useState(codeSnippet.title);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setEditorTheme();
  });

  const handleOnMount = async (event) => {
    setEditorTheme();
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

  const handleEditorCopy = (event, text) => {
    handleCopy(event, text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
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
          className="editor-nickname"
        ></input>
        <select
          value={language}
          onChange={handleLanguageChange}
          className="editor-lang"
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
          onClick={(event) => handleEditorCopy(event, code)}
          className="editor-btn"
        >
          {copied ? (
            <Check width={16} height={16} />
          ) : (
            <DocumentDuplicateOutline width={16} height={16} />
          )}
        </button>
        <button type="button" onClick={handleDestroy} className="editor-btn">
          <TrashOutline width={16} height={16} />
        </button>
      </div>

      <Editor
        height="7rem"
        language={language}
        defaultValue={code}
        onChange={handleCodeChange}
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
