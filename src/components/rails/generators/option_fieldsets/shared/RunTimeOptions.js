import React from 'react'
import Toggle from '../../../../form/Toggle'

function RunTimeOptions({handleOptionsChange}) {
  return (
    <div className="flex flex-col space-y-2">
      <h3>Runtime options</h3>
      <Toggle name={'--force'} label={'Overwrite files that already exists'} handleChange={handleOptionsChange} />
      <Toggle name={'--pretend'} label={'Run but do not make any changes'} handleChange={handleOptionsChange} />
      <Toggle name={'--quiet'} label={'Suppress status output'} handleChange={handleOptionsChange} />
      <Toggle name={'--skip'} label={'Skip files that already exist'} handleChange={handleOptionsChange} />
    </div>
  )
}

export default RunTimeOptions