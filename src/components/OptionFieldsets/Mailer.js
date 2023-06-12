import React from 'react'
import Toggle from '../form/Toggle';
import TextFieldWithLabel from '../form/TextFieldWithLabel';
import RunTimeOptions from './shared/RunTimeOptions';
import AddTextFields from './shared/AddTextFields';

function Mailer({handleNameChange, handleOptionsChange, handleActionChange, handleAddAction, actions}) {
  return (
    <fieldset className="flex flex-col text-left space-y-3 mt-2">
      <h3>Mailer generator:</h3>
      <TextFieldWithLabel name='mailer-name' placeholder='[name]_mailer.rb' label="Name" handleChange={handleNameChange}/>

      <div className="flex flex-col space-y-2">
        <h3>Mailer methods</h3>
        <AddTextFields placeholder='method name' handleChange={handleActionChange} handleAdd={handleAddAction} fields={actions} />
      </div>

      <div className="flex flex-col space-y-2">
        <h3>Options</h3>
        <Toggle name={'--skip-namespace'} label={'Skip Namespace'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-collision-check'} label={'Skip collision check'} handleChange={handleOptionsChange} />
        
        <TextFieldWithLabel name='--template-engine=' label="Template engine to be invoked" id='mailer-template-engine' handleChange={handleOptionsChange}/>
        <TextFieldWithLabel name='--test-framework=' label="Test framework to be invoked" id='mailer-test-framework' handleChange={handleOptionsChange}/>
      </div>

      <RunTimeOptions handleOptionsChange={handleOptionsChange} />
    </fieldset>
  )
}

export default Mailer