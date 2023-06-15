import React from 'react'

function Checkbox({name, label, handleChange}) {
  return (
    <div className="flex items-center">
      <input id={`${name}-checkbox`} name={name} type="checkbox" onChange={handleChange} value=""></input>
      <label htmlFor={`${name}-checkbox`}>{label}</label>
    </div>
  )
}

export default Checkbox