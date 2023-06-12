import React from 'react'
import Toggle from '../form/Toggle';
import TextFieldWithLabel from '../form/TextFieldWithLabel';
import RunTimeOptions from './shared/RunTimeOptions';
import AddTextFields from './shared/AddTextFields';

function Job({handleNameChange, handleOptionsChange}) {
  return (
    <fieldset className="flex flex-col text-left space-y-3 mt-2">
      <h3>Job generator:</h3>
      <TextFieldWithLabel name='job-name' label="Name" handleChange={handleNameChange}/>

      <div className="flex flex-col space-y-2">
        <h3>Options</h3>
        <Toggle name={'--skip-namespace'} label={'Skip Namespace'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-collision-check'} label={'Skip collision check'} handleChange={handleOptionsChange} />
        
        <TextFieldWithLabel name='--queue=' label="The queue name for the generated name" id='job-queue' handleChange={handleOptionsChange}/>
        <TextFieldWithLabel name='--template-engine=' label="Template engine to be invoked" id='job-template-engine' handleChange={handleOptionsChange}/>
      </div>

      <RunTimeOptions handleOptionsChange={handleOptionsChange} />
    </fieldset>
  )
}

export default Job