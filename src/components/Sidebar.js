import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside id="separator-sidebar" aria-label="Sidenav">
      <div className="sidebar-container">
        <ul className="space-y-2">
          <li>
            <Link to={"/rails"} className="sidebar-link group">
              <span className="ml-3">Ruby On Rails</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default Sidebar;
