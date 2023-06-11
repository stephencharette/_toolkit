import React from 'react'
import Radio from './form/Radio'

function GeneratorTypeSelector({ handleSelect, generator }) {
  return (
    <div className="flex flex-col text-left space-y-3">
      <h2>What to generate:</h2>
      <div className="flex flex-wrap gap-x-5 gap-y-3">
        <Radio handleSelect={() => handleSelect('scaffold')} type='scaffold' label='Scaffold'/>
        <Radio handleSelect={() => handleSelect('controller')} type='controller' label='Controller' />
        <Radio handleSelect={() => handleSelect('model')} type='model' label='Model'/>
        <Radio handleSelect={() => handleSelect('migration')} type='migration' label='Migration'/>
        <Radio handleSelect={() => handleSelect('mailer')} type='mailer' label='Mailer'/>
        <Radio handleSelect={() => handleSelect('helper')} type='helper' label='Helper'/>
        <Radio handleSelect={() => handleSelect('job')} type='job' label='Job'/>
        <Radio handleSelect={() => handleSelect('task')} type='task' label='Task'/>
      </div>
    </div>
  )
}

export default GeneratorTypeSelector