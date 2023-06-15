import React from "react";
import { useState } from "react";

function Result({ command }) {
  const [isCopied, setIsCopied] = useState(false);

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  const handleCopyClick = (event) => {
    event.preventDefault();
    copyTextToClipboard(command)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1500);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form className="fixed inset-x-0 bottom-0 px-4 drop-shadow-xl sm:ml-52 max-w-2xl">
      <div className="w-full border border-gray-200 rounded-b-none rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
          <label htmlFor="command" className="sr-only">
            Your generated command
          </label>
          <textarea
            value={`${command}`}
            id="command"
            rows="8"
            className="w-full px-0 font-mono text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            disabled={true}
          ></textarea>
        </div>
        <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
          <button type="submit" onClick={handleCopyClick} className="btn">
            Copy command
          </button>
          {/* TODO: make animation for checkmark! */}
        </div>
      </div>
    </form>
  );
}

export default Result;
