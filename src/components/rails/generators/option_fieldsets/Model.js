import React from 'react'
import Toggle from '../../../form/Toggle';
import TextFieldWithLabel from '../../../form/TextFieldWithLabel';
import ActiveRecordOptions from './shared/ActiveRecordOptions';
import TestUnitOptions from './shared/TestUnitOptions';
import RunTimeOptions from './shared/RunTimeOptions';

function Model({handleNameChange, handleOptionsChange}) {
  return (
    <fieldset className="flex flex-col text-left space-y-3 mt-2">
      <h3>Model options:</h3>
      <TextFieldWithLabel name='model-name' placeholder='[name].rb' label="Name" handleChange={handleNameChange}/>

      <div className="flex flex-col space-y-2">
        <h3>Options</h3>
        <Toggle name={'--skip-namespace'} label={'Skip Namespace'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-collision-check'} label={'Skip collision check'} handleChange={handleOptionsChange} />
        <Toggle name={'--force-plural'} checked={true} label={'Forces the use of the plural model name'} handleChange={handleOptionsChange} />
        <Toggle name={'--no-resource-route'} label={'Skip resource route generation'} handleChange={handleOptionsChange} />
        <Toggle name={'--api'} label={'API only'} handleChange={handleOptionsChange} />
        
        <TextFieldWithLabel name='--orm=' placeholder='active_record' label="ORM to be invoked" id='model-orm-name' handleOptionsChange={handleOptionsChange}/>
      </div>

      {/* TODO: hide if orm textbox is present or is active_record */}
      <ActiveRecordOptions handleOptionsChange={handleOptionsChange} />

      <TestUnitOptions handleOptionsChange={handleOptionsChange}/>

      <RunTimeOptions handleOptionsChange={handleOptionsChange}/>
    </fieldset>
  )
}

export default Model