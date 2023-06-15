import React from 'react'

function Radio({ name, label, handleSelect }) {
  return (
    <div className="flex items-center">
      <input id={`${name}-radio`} type="radio" value="" name={name} className="hidden" onChange={handleSelect}></input>
      <label htmlFor={`${name}-radio`} className="pretty-radio">{label}</label>
    </div>
  )
}

export default Radio