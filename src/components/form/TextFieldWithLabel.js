import React from 'react'

function TextFieldWithLabel({name, placeholder, label, id, handleChange}) {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor={name} className="text-left w-2/3">{label}</label>
      <input type="text" id={id} name={name} placeholder={placeholder} onChange={handleChange}></input>
    </div>
  )
}

export default TextFieldWithLabel