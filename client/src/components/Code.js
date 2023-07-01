import React, { useState, useContext, useEffect } from "react";
import useDarkSide from "./hooks/useDarkSide";
import Editor, { loader } from "@monaco-editor/react";
import * as Constants from "../constants/code.js";
import axios from "../config/axios";
import { UserContext } from "../UserContext.js";
// import SearchDropdown from "./form/SearchDropdown.js";
import { TrashOutline, DocumentDuplicateOutline, Check } from "heroicons-react";

import Active4D from "monaco-themes/themes/Active4D.json";
import AllHallowsEve from "monaco-themes/themes/All Hallows Eve.json";
import Amy from "monaco-themes/themes/Amy.json";
import BirdsOfParadise from "monaco-themes/themes/Birds of Paradise.json";
import Blackboard from "monaco-themes/themes/Blackboard.json";
import BrillianceBlack from "monaco-themes/themes/Brilliance Black.json";
import BrillianceDull from "monaco-themes/themes/Brilliance Dull.json";
import ChromeDevTools from "monaco-themes/themes/Chrome DevTools.json";
import CloudsMidnight from "monaco-themes/themes/Clouds Midnight.json";
import Clouds from "monaco-themes/themes/Clouds.json";
import Cobalt from "monaco-themes/themes/Cobalt.json";
import Cobalt2 from "monaco-themes/themes/Cobalt2.json";
import Dawn from "monaco-themes/themes/Dawn.json";
import DominionDay from "monaco-themes/themes/Dominion Day.json";
import Dracula from "monaco-themes/themes/Dracula.json";
import Dreamweaver from "monaco-themes/themes/Dreamweaver.json";
import Eiffel from "monaco-themes/themes/Eiffel.json";
import EspressoLibre from "monaco-themes/themes/Espresso Libre.json";
import GitHubDark from "monaco-themes/themes/GitHub Dark.json";
import GitHubLight from "monaco-themes/themes/GitHub Light.json";
import GitHub from "monaco-themes/themes/GitHub.json";
import IDLE from "monaco-themes/themes/IDLE.json";
import idleFingers from "monaco-themes/themes/idleFingers.json";
import iPlastic from "monaco-themes/themes/iPlastic.json";
import Katzenmilch from "monaco-themes/themes/Katzenmilch.json";
import krTheme from "monaco-themes/themes/krTheme.json";
import KuroirTheme from "monaco-themes/themes/Kuroir Theme.json";
import LAZY from "monaco-themes/themes/LAZY.json";
import MagicWBAmiga from "monaco-themes/themes/MagicWB (Amiga).json";
import MerbivoreSoft from "monaco-themes/themes/Merbivore Soft.json";
import Merbivore from "monaco-themes/themes/Merbivore.json";
import monoindustrial from "monaco-themes/themes/monoindustrial.json";
import MonokaiBright from "monaco-themes/themes/Monokai Bright.json";
import Monokai from "monaco-themes/themes/Monokai.json";
import NightOwl from "monaco-themes/themes/Night Owl.json";
import Nord from "monaco-themes/themes/Nord.json";
import OceanicNext from "monaco-themes/themes/Oceanic Next.json";
import PastelsOnDark from "monaco-themes/themes/Pastels on Dark.json";
import SlushAndPoppies from "monaco-themes/themes/Slush and Poppies.json";
import SolarizedDark from "monaco-themes/themes/Solarized-dark.json";
import SolarizedLight from "monaco-themes/themes/Solarized-light.json";
import SpaceCadet from "monaco-themes/themes/SpaceCadet.json";
import Sunburst from "monaco-themes/themes/Sunburst.json";
import TextmateMacClassic from "monaco-themes/themes/Textmate (Mac Classic).json";
import themelist from "monaco-themes/themes/themelist.json";
import TomorrowNightBlue from "monaco-themes/themes/Tomorrow-Night-Blue.json";
import TomorrowNightBright from "monaco-themes/themes/Tomorrow-Night-Bright.json";
import TomorrowNightEighties from "monaco-themes/themes/Tomorrow-Night-Eighties.json";
import TomorrowNight from "monaco-themes/themes/Tomorrow-Night.json";
import Tomorrow from "monaco-themes/themes/Tomorrow.json";
import Twilight from "monaco-themes/themes/Twilight.json";
import UpstreamSunburst from "monaco-themes/themes/Upstream Sunburst.json";
import VibrantInk from "monaco-themes/themes/Vibrant Ink.json";
import XcodeDefault from "monaco-themes/themes/Xcode_default.json";
import Zenburnesque from "monaco-themes/themes/Zenburnesque.json";

const themes = {
  Active4D,
  AllHallowsEve,
  Amy,
  BirdsOfParadise,
  Blackboard,
  BrillianceBlack,
  BrillianceDull,
  ChromeDevTools,
  CloudsMidnight,
  Clouds,
  Cobalt,
  Cobalt2,
  Dawn,
  DominionDay,
  Dracula,
  Dreamweaver,
  Eiffel,
  EspressoLibre,
  GitHubDark,
  GitHubLight,
  GitHub,
  IDLE,
  idleFingers,
  iPlastic,
  Katzenmilch,
  krTheme,
  KuroirTheme,
  LAZY,
  MagicWBAmiga,
  MerbivoreSoft,
  Merbivore,
  monoindustrial,
  MonokaiBright,
  Monokai,
  NightOwl,
  Nord,
  OceanicNext,
  PastelsOnDark,
  SlushAndPoppies,
  SolarizedDark,
  SolarizedLight,
  SpaceCadet,
  Sunburst,
  TextmateMacClassic,
  themelist,
  TomorrowNightBlue,
  TomorrowNightBright,
  TomorrowNightEighties,
  TomorrowNight,
  Tomorrow,
  Twilight,
  UpstreamSunburst,
  VibrantInk,
  XcodeDefault,
  Zenburnesque,
};

function Code({
  codeSnippetId,
  codeSnippet,
  handleAddCodeSnippet,
  handleDestroyCodeSnippet,
}) {
  const [colorTheme, setTheme] = useDarkSide();
  const allLanguageOptions = Constants.LANGUAGE_OPTIONS;

  const { userId, authToken, settings } = useContext(UserContext);
  const [code, setCode] = useState(codeSnippet.code.replace(/\\n/g, "\n"));
  const [language, setLanguage] = useState(codeSnippet.lang);
  // const [dropdownIsHidden, setDropdownIsHidden] = useState(true);
  const [languageOptions, setLanguageOptions] = useState(allLanguageOptions);
  const [inError, setInError] = useState(false);
  const [title, setTitle] = useState(codeSnippet.title);
  const [copied, setIsCopied] = useState(false);

  useEffect(() => {
    setEditorTheme();
  });

  const handleCopy = (event) => {
    event.preventDefault();
    copyTextToClipboard(code)
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

  const setEditorTheme = () => {
    loader.init().then((monaco) => {
      const importedTheme = settings ? themes[settings.theme] : themes["Nord"];

      monaco.editor.defineTheme(
        settings ? settings.theme : "Nord",
        importedTheme
      );
      monaco.editor.setTheme(settings ? settings.theme : "Nord");
    });
  };

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
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-1 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          <TrashOutline width={16} height={16} />
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

      <div className="relative group">
        <Editor
          height="7rem"
          language={language}
          defaultValue={code}
          onChange={handleCodeChange}
          onMount={handleOnMount}
          // className="relative"
        />
        <button
          type="button"
          onClick={handleCopy}
          className="text-gray-900 group-hover:block hidden absolute bottom-2 right-20 md:right-24 lg:right-28 ml-auto hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-md text-sm px-1 py-1 text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-800"
        >
          {copied ? (
            <Check width={20} height={20} />
          ) : (
            <DocumentDuplicateOutline width={20} height={20} />
          )}
        </button>
      </div>
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
