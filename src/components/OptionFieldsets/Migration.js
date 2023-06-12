import React from 'react'
import Toggle from '../form/Toggle';
import TextFieldWithLabel from '../form/TextFieldWithLabel';
import ActiveRecordOptions from './shared/ActiveRecordOptions';
import RunTimeOptions from './shared/RunTimeOptions';
import AddTextSelectPairs from './shared/AddTextSelectPairs';

function Migration({fieldPairs, handleNameChange, handleOptionsChange, handleOptionPairSelectChange, handleOptionPairTextChange, handleAddOptionPair}) {
  return (
    <fieldset className="flex flex-col text-left space-y-3 mt-2">
      <h3>Migration options:</h3>
      <TextFieldWithLabel name='migration-name' placeholder='[generated_timestamp]_[name].rb' label="Name" handleChange={handleNameChange}/>

      <AddTextSelectPairs fieldPairs={fieldPairs} handleOptionPairTextChange={handleOptionPairTextChange} handleOptionPairSelectChange={handleOptionPairSelectChange} handleAddOptionPair={handleAddOptionPair} />

      <div className="flex flex-col space-y-2">
        <h3>Options</h3>
        <Toggle name={'--skip-namespace'} label={'Skip Namespace'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-collision-check'} label={'Skip collision check'} handleChange={handleOptionsChange} />

        <TextFieldWithLabel name='--orm=' placeholder='active_record' label="ORM to be invoked" id='migration-orm-name' handleOptionsChange={handleOptionsChange}/>
      </div>

      {/* TODO: hide if orm textbox is present or is active_record */}
      <ActiveRecordOptions handleOptionsChange={handleOptionsChange} />

      <RunTimeOptions handleOptionsChange={handleOptionsChange}/>
    </fieldset>
  )
}

export default Migration