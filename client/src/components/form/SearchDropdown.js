import React, { useState } from "react";

function SearchDropdown({
  selected,
  handleClick,
  handleSearch,
  handleChange,
  isHidden,
  options,
}) {
  if (options) {
    return (
      <div
        id="dropdownSearch"
        className="z-10 bg-white rounded-lg shadow w-48 dark:bg-gray-700"
        onClick={handleClick}
      >
        <div className="p-3">
          <label htmlFor="input-group-search" className="sr-only">
            Search
          </label>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"></div>
            <input
              type="text"
              id="input-group-search"
              onChange={handleSearch}
              className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={selected ? selected["label"] : "Select language"}
            ></input>
          </div>
        </div>
        <ul
          hidden={isHidden}
          className="h-48 px-3 pb-3 overflow-y-auto text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownSearchButton"
        >
          {options.map((option, index) => (
            <div
              key={index}
              className="flex text-left items-center pl-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <input
                id={`${option.value}-language`}
                type="radio"
                name={option.label}
                value={option.value}
                onChange={handleChange}
                className="w-4 hidden h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
              ></input>
              <label
                htmlFor={`${option.value}-language`}
                className="w-full py-2 ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                {option.label}
              </label>
            </div>
          ))}
        </ul>
      </div>
    );
  } else {
    <p>loading...</p>;
  }
}

export default SearchDropdown;
