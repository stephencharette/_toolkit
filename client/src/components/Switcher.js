import { useState } from "react";
import useDarkSide from "./hooks/useDarkSide";
import { MoonIcon, SunIcon } from "@heroicons/react/24/outline";

export default function Switcher() {
  const [colorTheme, setTheme] = useDarkSide();
  const [darkSide, setDarkSide] = useState(
    colorTheme === "light" ? true : false
  );

  const toggleDarkMode = (checked) => {
    setTheme(colorTheme);
    setDarkSide(checked);
  };

  return (
    <button
      id="theme-toggle"
      type="button"
      onClick={toggleDarkMode}
      className="text-gray-500 m-2 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
    >
      <div className="flex space-x-2">
        <MoonIcon className="h-5 w-5" />
        <span>/</span>
        <SunIcon className="h-5 w-5" />
      </div>
    </button>
  );
}
