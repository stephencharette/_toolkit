import React from 'react'
import Toggle from '../form/Toggle';
import TextField from '../form/TextField';
import SelectOption from '../form/SelectOption';
import * as Constants from '../../constants/rails/index.js';

function Scaffold({fieldPairs, handleAddOptionPair, handleOptionPairTextChange, handleOptionPairSelectChange, handleNameChange, handleOptionsChange}) {
  return (
    <fieldset className="flex flex-col text-left space-y-3 mt-2">
      <h3>Scaffold generator:</h3>
      <TextField name='scaffold-name' placeholder='[name]_controller.rb' label="Name" handleOptionsChange={handleOptionsChange}/>

      <div className="flex flex-col space-y-2">
        <label htmlFor="controller-actions">Add fields</label>
        <fieldset class="ml-2 space-y-2">
          {fieldPairs.map((pair, index) => (
            <SelectOption textValue={pair.field} selectValue={pair.fieldType} index={index} key={index} handleOptionPairTextChange={handleOptionPairTextChange} handleOptionPairSelectChange={handleOptionPairSelectChange} options={Constants.DATA_TYPE_OPTIONS} />
          ))}
        </fieldset>
        <button type="button" className="small w-10 ml-auto" onClick={handleAddOptionPair}>+</button>
      </div>

      <div className="flex flex-col space-y-2">
        <h3>Options</h3>
        <Toggle name={'--skip-namespace'} label={'Skip Namespace'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-collision-check'} checked={true} label={'Skip collision check'} handleChange={handleOptionsChange} />
        <Toggle name={'--force-plural'} checked={true} label={'Forces the use of the given model name'} handleChange={handleOptionsChange} />
        <Toggle name={'--no-resource-route'} label={'Skip resource route generation'} handleChange={handleOptionsChange} />
        <Toggle name={'--api'} label={'API only'} handleChange={handleOptionsChange} />
        
        <TextField name='--orm=' placeholder='active_record' label="ORM to be invoked" id='scaffold-orm-name' handleOptionsChange={handleOptionsChange}/>
        <TextField name='--model-name=' label="ModelName to be used" id='scaffold-model-name' handleOptionsChange={handleOptionsChange}/>
      </div>

      {/* TODO: hide if orm textbox is present or is active_record */}
      <div className="flex flex-col space-y-2">
        <h3>ActiveRecord options</h3>
        <Toggle name={'--no-migration'} label={'Skip Migration'} handleChange={handleOptionsChange} />
        <Toggle name={'--no-timestamps'} label={'Skip Timestamps'} handleChange={handleOptionsChange} />
        <Toggle name={'--no-indexes'} label={'Skip indexes for refereces and belongs_to columns'} handleChange={handleOptionsChange} />
        <TextField name='--primary-key-type=' label="The type for primary key" id='scaffold-primary-key-type' handleOptionsChange={handleOptionsChange}/>
        <TextField name='--database=' placeholder="primary database" label="The database for your model's migration." id='scaffold-database' handleOptionsChange={handleOptionsChange}/>
        <TextField name='--test-framework=' placeholder='test_unit' label="Test framework to be invoked." id='scaffold-test-framework' handleOptionsChange={handleOptionsChange}/>
      </div>

      {/* TODO: hide if test-framework textbox is present or is test_unit */}
      <div className="flex flex-col space-y-2">
        <h3>TestUnit options</h3>
        <Toggle name={'--no-fixture'} checked={true} label={'Skip generate fixture'} handleChange={handleOptionsChange} />
        <TextField name='--fixture-replacement=' label="Fixture replacement to be invoked." id='scaffold-fixture-replacement' handleOptionsChange={handleOptionsChange}/>
        <TextField name='--system-tests=' label="System test file." id='scaffold-system-tests' handleOptionsChange={handleOptionsChange}/>
      </div>

      <div className="flex flex-col space-y-2">
        <h3>ScaffoldController options</h3>
        <Toggle name={'--no-helper'} label={'Skip generate helper'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip-routes'} label={'Skip routes'} handleChange={handleOptionsChange} />
        <Toggle name={'--no-jbuilder'} label={'Generate jbuilder'} handleChange={handleOptionsChange} />
        <TextField name='--template-engine=' label="Template engine to be invoked." id='scaffold-template-engine' handleOptionsChange={handleOptionsChange}/>
      </div>

      <div className="flex flex-col space-y-2">
        <h3>Runtime options</h3>
        <Toggle name={'--force'} label={'Overwrite files that already exists'} handleChange={handleOptionsChange} />
        <Toggle name={'--pretend'} label={'Run but do not make any changes'} handleChange={handleOptionsChange} />
        <Toggle name={'--quiet'} label={'Suppress status output'} handleChange={handleOptionsChange} />
        <Toggle name={'--skip'} label={'Skip files that already exist'} handleChange={handleOptionsChange} />
      </div>
    </fieldset>
  )
}

export default Scaffold