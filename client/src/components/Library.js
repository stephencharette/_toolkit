import React, { useState, useContext, useEffect } from "react";
import OpenSidebarButton from "./OpenSidebarButton";
import Code from "./Code";
import { UserContext } from "../UserContext";
import axios from "../config/axios";
import SearchDropdown from "./form/SearchDropdown";
import MonacoEditor from "@uiw/react-monacoeditor";
import { Auth } from "../Auth";

function Library() {
  const { userId, authToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [codeSnippets, setCodeSnippets] = useState({});
  // TODO: did component mount?
  useEffect(() => {
    if (!userId) return;
    const getCodeSnippets = async () => {
      try {
        const result = await axios({
          method: "get",
          url: `/users/${userId}/code_snippets`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            Authorization: authToken,
          },
        });

        if (result.status !== 200 || userId != result.data.userId) return;

        setCodeSnippets(result.data.library.codeSnippets);
      } catch (error) {
        // TODO: handle error...
      } finally {
        setIsLoading(false);
      }
    };

    getCodeSnippets();
  }, []);

  const handleAddCodeSnippet = () => {
    const newCodeSnippets = { ...codeSnippets };
    newCodeSnippets.new = { lang: "", code: "Your code here." };
    setCodeSnippets(newCodeSnippets);
  };

  const handleDestroyCodeSnippet = (documentId) => {
    let newCodeSnippets = { ...codeSnippets };
    delete newCodeSnippets[documentId];
    setCodeSnippets(newCodeSnippets);
  };

  const handleAddCodeSnippetDocument = ({ code, documentId }) => {
    const newCodeSnippets = { ...codeSnippets };
    delete newCodeSnippets["new"];
    const document = { lang: "rb", code: code };
    newCodeSnippets[documentId] = document;
    setCodeSnippets(newCodeSnippets);
  };
  if (!userId) {
    return (
      <div className="mt-5 space-y-3">
        <h1 className="text-2xl font-bold">
          You must be logged in to access your Library
        </h1>
      </div>
    );
  } else {
    return (
      // TODO: add filters
      <div className="space-y-3">
        <div className="flex items-center">
          <h1 className="font-semibold text-3xl text-left">Your Library</h1>
          <OpenSidebarButton />
        </div>
        {isLoading ? (
          <div
            role="status"
            className="space-y-8 flex flex-col w-full animate-pulse md:space-y-2 md:flex md:items-center"
          >
            <div className="flex items-center justify-center w-full h-48 bg-gray-300 rounded-md dark:bg-gray-700">
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="space-y-3 w-full flex flex-col">
            <SearchDropdown />
            {Object.entries(codeSnippets).map(([id, codeSnippet]) => (
              <Code
                handleAddCodeSnippet={handleAddCodeSnippetDocument}
                handleDestroyCodeSnippet={handleDestroyCodeSnippet}
                key={id}
                codeSnippetId={id}
                codeSnippet={codeSnippet}
              />
            ))}

            {/* TODO: disable button until next item is saved. */}
            <MonacoEditor
              language="html"
              value="<h1>I ♥ react-monacoeditor</h1>"
              options={{
                theme: "vs-dark",
              }}
            />
            <button
              type="button"
              onClick={handleAddCodeSnippet}
              className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
            >
              Add Code Snippet
            </button>
          </div>
        )}
      </div>
    );
  }
}

export default Library;
