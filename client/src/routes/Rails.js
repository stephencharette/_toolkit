import React from "react";
import OpenSidebarButton from "../components/OpenSidebarButton";
import { Link, Outlet } from "react-router-dom";
import { CommandLineIcon } from "@heroicons/react/24/outline";

import {
  ArrowTopRightOnSquareIcon,
  ChevronUpDownIcon,
  LanguageIcon,
} from "@heroicons/react/24/solid";

function Rails() {
  return (
    <div className="space-y-3">
      <div className="flex items-center">
        <h1 className="font-semibold text-3xl text-left">
          Ruby on Rails Framework Helpers
        </h1>
        <OpenSidebarButton />
      </div>
      <ul className="grid w-full gap-3 md:grid-cols-2">
        <li>
          <Link to={"/rails/generators"}>
            <label htmlFor="generators-select" className="pretty-label">
              <div className="block">
                <div className="text-left w-full text-lg font-semibold">
                  Generators
                </div>
                <div className="text-left w-full font-mono">
                  rails generate ...
                </div>
              </div>
              <CommandLineIcon className="h-8 w-8" />
            </label>
          </Link>
        </li>
        <li>
          <Link to={"https://strftimer.com/"} target="_blank">
            <label htmlFor="form-helpers-select" className="pretty-label">
              <div className="block">
                <div className="text-left w-full text-lg font-semibold">
                  String Format Time
                </div>
                <div className="w-full font-mono">t.strftime("%a %b %y")</div>
              </div>
              <ArrowTopRightOnSquareIcon className="h-7 w-7" />
            </label>
          </Link>
        </li>
        <li className="relative">
          <Link to={"/rails/form_helpers"} target="_blank">
            <label htmlFor="form-helpers-select" className="pretty-label">
              <div className="block">
                <div className="text-left w-full text-lg font-semibold">
                  Form Helpers
                </div>
                <div className="w-full font-mono">options_for_select...</div>
              </div>
              <ChevronUpDownIcon className="h-7 w-7" />
            </label>
          </Link>
          <span className="bg-blue-100 absolute -top-1 -right-5 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            COMING SOON
          </span>
        </li>
        <li className="relative">
          <Link to={"/rails/internationalization"} target="_blank">
            <label htmlFor="form-helpers-select" className="pretty-label">
              <div className="block">
                <div className="text-left w-full text-lg font-semibold">
                  Internationalization
                </div>
                <div className="text-left w-full font-mono">t('.success')</div>
              </div>
              <LanguageIcon className="h-7 w-7" />
            </label>
          </Link>
          <span className="bg-blue-100 absolute -top-1 -right-5 text-blue-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
            COMING SOON
          </span>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default Rails;
