import React from "react";
import { Link } from "react-router-dom";
import Switcher from "./Switcher";

function Sidebar() {
  return (
    // TODO: add logo or something here...
    // TODO: add PostgreSQL (pg_restore, pg_dump, ...)
    <aside id="separator-sidebar" aria-label="Sidenav">
      <div className="sidebar-container flex flex-col justify-between">
        <ul className="space-y-2">
          <li>
            <Link to={"/rails"} className="sidebar-link group">
              <span className="ml-3">Ruby On Rails</span>
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
