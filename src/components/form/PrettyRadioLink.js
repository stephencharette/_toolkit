import React from 'react'
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/solid'

function PrettyRadioLink({ link, label }) {
  return (
    <li>
      <a href={link} target="_blank" rel="noopener noreferrer" className="pretty-radio select-none">
        {label}
        <ArrowTopRightOnSquareIcon className="h-4 w-4 p-0 text-gray-700 ml-1" />
      </a>
    </li>
  )
}

export default PrettyRadioLink