import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Switcher from "./Switcher";
import { UserContext } from "../UserContext";
import { Auth } from "../Auth";

function Sidebar() {
  const { userId } = useContext(UserContext);

  return (
    // TODO: add logo or something here...
    // TODO: add PostgreSQL (pg_restore, pg_dump, ...)
    <aside id="separator-sidebar" aria-label="Sidenav">
      <div className="sidebar-container flex flex-col justify-between">
        <ul className="space-y-2">
          <li className="mb-6">
            <h1 className="font-mono select-none text-3xl font-bold">
              _toolkit
            </h1>
          </li>
          <li>
            <Auth />
          </li>
          <li>
            <Link to={"/rails"} className="sidebar-link group">
              <span className="ml-3">Ruby on Rails</span>
            </Link>
          </li>
        </ul>
        <div class="">
          <Switcher />
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
