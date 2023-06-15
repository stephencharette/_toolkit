import React from "react";

function PrettyRadioLink({ link, label }) {
  return (
    <li>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="pretty-radio select-none"
      >
        {label}
      </a>
    </li>
  );
}

export default PrettyRadioLink;
