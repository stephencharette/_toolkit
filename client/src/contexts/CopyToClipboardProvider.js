import React, { useState, createContext } from "react";

export const CopyToClipboardContext = createContext();

export const CopyToClipboardProvider = ({ children }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = (event, text) => {
    event.preventDefault();
    copyTextToClipboard(text)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 1000);
      })
      .catch((error) => {
        // TODO: handle error here...
      });
  };

  async function copyTextToClipboard(text) {
    if ("clipboard" in navigator) {
      return await navigator.clipboard.writeText(text);
    } else {
      return document.execCommand("copy", true, text);
    }
  }

  return (
    <CopyToClipboardContext.Provider
      value={{
        handleCopy,
      }}
    >
      {children}
    </CopyToClipboardContext.Provider>
  );
};
