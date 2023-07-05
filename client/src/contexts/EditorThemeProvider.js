import React, { useState, createContext, useContext } from "react";
import { UserContext } from "./UserContext.js";
import { loader } from "@monaco-editor/react";

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

export const EditorThemeContext = createContext();

const DEFAULT_THEME = "Nord";

export const EditorThemeProvider = ({ children }) => {
  const { settings } = useContext(UserContext);

  const setEditorTheme = () => {
    loader.init().then((monaco) => {
      const importedTheme = settings
        ? themes[settings.theme]
        : themes[DEFAULT_THEME];

      monaco.editor.defineTheme(
        settings ? settings.theme : DEFAULT_THEME,
        importedTheme
      );
      monaco.editor.setTheme(settings ? settings.theme : DEFAULT_THEME);
    });
  };

  return (
    <EditorThemeContext.Provider
      value={{
        setEditorTheme,
      }}
    >
      {children}
    </EditorThemeContext.Provider>
  );
};
