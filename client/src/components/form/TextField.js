import React from 'react'

function TextField({handleChange, name, index, textValue, placeholder}) {
  return (
    <div className="flex items-center space-x-2">
      <input type="text" name={`${name}-${index}`} required={true} value={textValue} placeholder={placeholder} onChange={(event) => handleChange(event, index)}></input>
    </div>
  )
}

export default TextField