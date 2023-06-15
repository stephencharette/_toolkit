import React from 'react'
import TextFieldWithLabel from '../../../../form/TextFieldWithLabel'
import Toggle from '../../../../form/Toggle'

function TestUnitOptions({handleOptionsChange}) {
  return (
    <div className="flex flex-col space-y-2">
      <h3>TestUnit options</h3>
      <Toggle name={'--no-fixture'} checked={true} label={'Skip generate fixture'} handleChange={handleOptionsChange} />
      <TextFieldWithLabel name='--fixture-replacement=' label="Fixture replacement to be invoked." id='scaffold-fixture-replacement' handleChange={handleOptionsChange}/>
      <TextFieldWithLabel name='--system-tests=' label="System test file." id='scaffold-system-tests' handleChange={handleOptionsChange}/>
    </div>
  )
}

export default TestUnitOptions