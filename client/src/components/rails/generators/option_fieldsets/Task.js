import React from 'react'
import Toggle from '../../../form/Toggle';
import TextFieldWithLabel from '../../../form/TextFieldWithLabel';
import RunTimeOptions from './shared/RunTimeOptions';
import AddTextFields from './shared/AddTextFields';

function Task({handleNameChange, handleOptionsChange, handleActionChange, handleAddAction, actions}) {
  return (
    <fieldset className="flex flex-col text-left space-y-3 mt-2">
    <h3>Task generator:</h3>
      <TextFieldWithLabel name='task-name' label="Name" handleChange={handleNameChange}/>

      <div className="flex flex-col space-y-2">
        <h3>Add tasks</h3>
        <AddTextFields placeholder='task name' handleChange={handleActionChange} handleAdd={handleAddAction} fields={actions} />
      </div>

      <div className="flex flex-col space-y-2">
        <h3>Options</h3>
        <Toggle name={'--skip-namespace'} label={'Skip Namespace'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-collision-check'} label={'Skip collision check'} handleChange={handleOptionsChange} />
      </div>

      <RunTimeOptions handleOptionsChange={handleOptionsChange} />
    </fieldset>
  )
}

export default Task