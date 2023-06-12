import React from 'react'

function PrettyRadio({ name, label, value, handleSelect, popular }) {
  return (
    <li>
      <input id={`${value}-radio`} type='radio' value="" name={name} class="hidden peer" onChange={handleSelect}></input>
      <label htmlFor={`${value}-radio`} class="pretty-radio relative select-none">
        {label}
      </label>
    </li>
  )
}

export default PrettyRadio