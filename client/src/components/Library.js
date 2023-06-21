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
        const serverUrl = "http://localhost:3001";
        const result = await axios({
          method: "get",
          url: `${serverUrl}/users/${userId}/code_snippets`,
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

  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <h1 className="font-semibold text-3xl text-left">Your Library</h1>
        <OpenSidebarButton />
      </div>
      {isLoading ? (
        // TODO: better loading thingy here...
        <p>loading...</p>
      ) : (
        <div>
          <SearchDropdown />
          {Object.entries(codeSnippets).map(([id, codeSnippet]) => (
            <Code key={id} codeSnippetId={id} codeSnippet={codeSnippet} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Library;
