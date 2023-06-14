import React from 'react'
import TextField from '../../../../form/TextField.js';

function AddTextFields({handleChange, handleAdd, fields, label, placeholder}) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="controller-actions">{label}</label>
      <fieldset className="ml-2 space-y-2">
        {fields.map((field, index) => (
          <TextField placeholder={placeholder} textValue={field} index={index} key={index} handleChange={handleChange} />
        ))}
      </fieldset>
      <button type="button" className="small w-10 ml-auto" onClick={handleAdd}>+</button>
      {/* TODO: add way to remove! */}
    </div>
  )
}

export default AddTextFields