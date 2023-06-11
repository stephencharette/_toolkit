import React from 'react'

function TextField({name, placeholder, label, id, handleOptionsChange}) {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor={name} className="text-left w-2/3">{label}</label>
      <input type="text" id={id} name={name} placeholder={placeholder} onChange={handleOptionsChange}></input>
    </div>
  )
}

export default TextField