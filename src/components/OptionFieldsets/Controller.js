import React from 'react'
import Toggle from '../form/Toggle';

function Controller({handleNameChange, handleOptionsChange}) {
  return (
    <fieldset className="flex flex-col text-left space-y-3 mt-2">
      <h3>Controller options:</h3>
      <div className="flex items-center space-x-2">
        <label htmlFor="controller-name" className="text-left">Name</label>
        <input type="text" id="controller-name" pattern="[a-z]*" placeholder="[name]_controller.rb" onChange={handleNameChange}></input>
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="controller-actions">Controller actions</label>
        <Toggle name={'index'} label={'Index'} handleChange={handleOptionsChange} />
        <Toggle name={'show'} label={'Show'} handleChange={handleOptionsChange} />
        <Toggle name={'edit'} label={'Edit'} handleChange={handleOptionsChange} />
        <Toggle name={'create'} label={'Create'} handleChange={handleOptionsChange} />
        <Toggle name={'update'} label={'Update'} handleChange={handleOptionsChange} />
        <Toggle name={'destroy'} label={'Destroy'} handleChange={handleOptionsChange} />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="controller-actions">Options</label>
        <Toggle name={'--skip-namespace'} label={'Skip Namespace'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-routes'} label={'Skip Routes'} handleChange={handleOptionsChange} />
        <Toggle name={'--helper'} checked={true} label={'Add Helper File'} handleChange={handleOptionsChange} />
      </div>

      <div className="flex flex-col space-y-2">
        <label htmlFor="controller-actions">Runtime options</label>
        <Toggle name={'--force'} label={'Overwrite files that already exists'} handleChange={handleOptionsChange} />
        <Toggle name={'--pretend'} label={'Run but do not make any changes'} handleChange={handleOptionsChange} />
        <Toggle name={'--quiet'} label={'Suppress status output'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip'} label={'Skip files that already exist'} handleChange={handleOptionsChange} />
      </div>
    </fieldset>
  )
}

export default Controller