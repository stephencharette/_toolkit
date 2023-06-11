import React from 'react'

function Radio({ type, label, handleSelect }) {
  return (
    <div className="flex items-center">
      <input id={`${type}-radio`} type="radio" value="" text="adsfasd" name="generate-type-radio" onChange={handleSelect}></input>
      <label htmlFor={`${type}-radio`}>{label}</label>
    </div>
  )
}

export default Radio