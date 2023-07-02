import React, { useContext, useMemo, useEffect, useState } from "react";
import * as Monaco from "../constants/monacoThemes.js";
import OpenSidebarButton from "../components/OpenSidebarButton";
import axios from "axios";
import { UserContext } from "../UserContext.js";

function Settings() {
  const { userId, authToken, settings, setSettings } = useContext(UserContext);

  const handleThemeChange = async (event) => {
    const value = event.target.value;

    try {
      const result = await axios({
        method: "patch",
        url: `/settings/${userId}?theme=${encodeURIComponent(value)}`,
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: authToken,
        },
      });

      setSettings(result.data.settings);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <h1 className="font-semibold text-3xl text-left">Your Settings</h1>
        <OpenSidebarButton />
      </div>
      {!settings ? (
        <div
          role="status"
          className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <div className="flex items-center justify-between pt-4">
            <div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
          </div>
          <span className="sr-only">Loading...</span>
        </div>
      ) : (
        <div className="flex flex-col space-y-2">
          <label htmlFor="controller-actions">Code Editor Theme</label>
          <div className="flex items-center space-x-2">
            <select
              className="font-mono"
              defaultValue={settings ? settings.theme : "vs-dark"}
              onChange={handleThemeChange}
            >
              {Monaco.THEMES.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {/* TODO: add way to remove! */}
        </div>
      )}
    </div>
  );
}
export default Settings;
