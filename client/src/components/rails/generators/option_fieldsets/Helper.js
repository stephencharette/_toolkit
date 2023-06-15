import React from 'react'
import Toggle from '../../../form/Toggle';
import TextFieldWithLabel from '../../../form/TextFieldWithLabel';
import RunTimeOptions from './shared/RunTimeOptions';

function Helper({handleNameChange, handleOptionsChange}) {
  return (
    <fieldset className="flex flex-col text-left space-y-3 mt-2">
      <h3>Helper generator:</h3>
      <TextFieldWithLabel name='helper-name' placeholder='[name]_helper.rb' label="Name" handleChange={handleNameChange}/>

      <div className="flex flex-col space-y-2">
        <h3>Options</h3>
        <Toggle name={'--skip-namespace'} label={'Skip Namespace'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-collision-check'} label={'Skip collision check'} handleChange={handleOptionsChange} />
        
        <TextFieldWithLabel name='--template-engine=' label="Template engine to be invoked" id='helper-template-engine' handleChange={handleOptionsChange}/>
      </div>

      <RunTimeOptions handleOptionsChange={handleOptionsChange} />
    </fieldset>
  )
}

export default Helper