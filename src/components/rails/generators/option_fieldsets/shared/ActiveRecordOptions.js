import React from 'react'
import Toggle from '../../../../form/Toggle'
import TextFieldWithLabel from '../../../../form/TextFieldWithLabel'

function ActiveRecordOptions({handleOptionsChange}) {
  return (
    <div className="flex flex-col space-y-2">
      <h3>ActiveRecord options</h3>
      <Toggle name={'--no-migration'} label={'Skip Migration'} handleChange={handleOptionsChange} />
      <Toggle name={'--no-timestamps'} label={'Skip Timestamps'} handleChange={handleOptionsChange} />
      <Toggle name={'--no-indexes'} label={'Skip indexes for refereces and belongs_to columns'} handleChange={handleOptionsChange} />
      <TextFieldWithLabel name='--primary-key-type=' label="The type for primary key" handleChange={handleOptionsChange}/>
      <TextFieldWithLabel name='--database=' placeholder="primary database" label="The database for your model's migration." handleChange={handleOptionsChange}/>
      <TextFieldWithLabel name='--test-framework=' placeholder='test_unit' label="Test framework to be invoked." handleChange={handleOptionsChange}/>
    </div>
  )
}

export default ActiveRecordOptions