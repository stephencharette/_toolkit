import React from 'react'
import Toggle from '../form/Toggle';
import TextFieldWithLabel from '../form/TextFieldWithLabel';
import TestUnitOptions from './shared/TestUnitOptions';
import ActiveRecordOptions from './shared/ActiveRecordOptions';
import RunTimeOptions from './shared/RunTimeOptions';
import AddTextSelectPairs from './shared/AddTextSelectPairs';

function Scaffold({fieldPairs, handleAddOptionPair, handleOptionPairTextChange, handleOptionPairSelectChange, handleNameChange, handleOptionsChange}) {
  return (
    <fieldset className="flex flex-col text-left space-y-3 mt-2">
      <h3>Scaffold generator:</h3>
      <TextFieldWithLabel name='scaffold-name' placeholder='[name]_controller.rb' label="Name" handleChange={handleNameChange}/>

      <AddTextSelectPairs fieldPairs={fieldPairs} handleOptionPairTextChange={handleOptionPairTextChange} handleOptionPairSelectChange={handleOptionPairSelectChange} handleAddOptionPair={handleAddOptionPair} />

      <div className="flex flex-col space-y-2">
        <h3>Options</h3>
        <Toggle name={'--skip-namespace'} label={'Skip Namespace'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-collision-check'} label={'Skip collision check'} handleChange={handleOptionsChange} />
        <Toggle name={'--force-plural'} label={'Forces the use of the plural model name'} handleChange={handleOptionsChange} />
        <Toggle name={'--no-resource-route'} label={'Skip resource route generation'} handleChange={handleOptionsChange} />
        <Toggle name={'--api'} label={'API only'} handleChange={handleOptionsChange} />
        
        <TextFieldWithLabel name='--orm=' placeholder='active_record' label="ORM to be invoked" id='scaffold-orm-name' handleChange={handleOptionsChange}/>
        <TextFieldWithLabel name='--model-name=' label="ModelName to be used" id='scaffold-model-name' handleChange={handleOptionsChange}/>
      </div>

      {/* TODO: hide if orm textbox is present or is active_record */}
      <ActiveRecordOptions handleOptionsChange={handleOptionsChange} />

      {/* TODO: hide if test-framework textbox is present or is test_unit */}
      <TestUnitOptions handleOptionsChange={handleOptionsChange} />

      <div className="flex flex-col space-y-2">
        <h3>ScaffoldController options</h3>
        <Toggle name={'--no-helper'} label={'Skip generate helper'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-routes'} label={'Skip routes'} handleChange={handleOptionsChange} />
        <Toggle name={'--no-jbuilder'} label={'Generate jbuilder'} handleChange={handleOptionsChange} />
        <TextFieldWithLabel name='--template-engine=' label="Template engine to be invoked." id='scaffold-template-engine' handleChange={handleOptionsChange}/>
      </div>

      <RunTimeOptions handleOptionsChange={handleOptionsChange} />
    </fieldset>
  )
}

export default Scaffold