import React, { useState, useContext, useEffect } from "react";
import OpenSidebarButton from "./OpenSidebarButton";
import Code from "./Code";
import { UserContext } from "../UserContext";
import axios from "axios";
import SearchDropdown from "./form/SearchDropdown";

function Library() {
  const { userId, authToken } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const [codeSnippets, setCodeSnippets] = useState({});

  useEffect(() => {
    const getCodeSnippets = async () => {
      try {
        const result = await axios({
          method: "get",
          url: `${process.env.REACT_APP_HOST}/users/${userId}/code_snippets`,
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": "true",
            Authorization: authToken,
          },
        });

        if (result.status !== 200 || userId != result.data.userId) return;

        console.log(result.data.library.codeSnippets);
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
  return (
    // TODO: add filters
    <div className="space-y-3">
      <div className="flex items-center">
        <h1 className="font-semibold text-3xl text-left">Your Library</h1>
        <OpenSidebarButton />
      </div>
      {isLoading ? (
        // TODO: better loading thingy here...
        <p>loading...</p>
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
          <button
            type="button"
            className="small w-10 ml-auto"
            onClick={handleAddCodeSnippet}
          >
            +
          </button>
        </div>
      )}
    </div>
  );
}

export default Library;
