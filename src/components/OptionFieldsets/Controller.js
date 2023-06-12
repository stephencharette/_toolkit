import React from 'react'
import Toggle from '../form/Toggle';
import TextFieldWithLabel from '../form/TextFieldWithLabel';
import AddTextFields from './shared/AddTextFields';
import Checkbox from '../form/Checkbox'

function Controller({handleNameChange, handleOptionsChange, handleActionChange, handleAddAction, actions}) {
  return (
    <fieldset className="flex flex-col text-left space-y-3 mt-2">
      <h3>Controller options:</h3>
      <TextFieldWithLabel name='controller-name' placeholder='[name]_controller.rb' label="Name" handleChange={handleNameChange}/>

      <div className="flex flex-col space-y-2">
        <h3>Controller actions</h3>
        <fieldset className="ml-2 space-y-2">
          <Checkbox name={'index'} label={'Index'} handleChange={handleActionChange} />
          <Checkbox name={'show'} label={'Show'} handleChange={handleActionChange} />
          <Checkbox name={'edit'} label={'Edit'} handleChange={handleActionChange} />
          <Checkbox name={'create'} label={'Create'} handleChange={handleActionChange} />
          <Checkbox name={'update'} label={'Update'} handleChange={handleActionChange} />
          <Checkbox name={'destroy'} label={'Destroy'} handleChange={handleActionChange} />
        </fieldset>
        
        <AddTextFields placeholder='custom action name' handleChange={handleActionChange} handleAdd={handleAddAction} fields={actions} />
      </div>

      <div className="flex flex-col space-y-2">
        <h3>Options</h3>
        <Toggle name={'--skip-namespace'} label={'Skip Namespace'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-routes'} label={'Skip Routes'} handleChange={handleOptionsChange} />
        <Toggle name={'--no-helper'} checked={true} label={'Skip Helper File'} handleChange={handleOptionsChange} />
      </div>

      
    </fieldset>
  )
}

export default Controller