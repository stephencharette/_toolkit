import React from 'react'
import PrettyRadio from './form/PrettyRadio'

function GeneratorTypeSelector({ handleSelect, generator }) {
  return (
    <div className="flex flex-col text-left space-y-3">
      <h2>What to generate:</h2>
      <ul className="flex flex-wrap gap-x-1 gap-y-2">
        <PrettyRadio handleSelect={() => handleSelect('scaffold')} name='generator' value='scaffold' label='Scaffold'/>
        <PrettyRadio handleSelect={() => handleSelect('controller')} name='generator' value='controller' label='Controller' />
        <PrettyRadio handleSelect={() => handleSelect('model')} name='generator' value='model' label='Model'/>
        <PrettyRadio handleSelect={() => handleSelect('migration')} name='generator' value='migration' label='Migration'/>
        <PrettyRadio handleSelect={() => handleSelect('mailer')} name='generator' value='mailer' label='Mailer'/>
        <PrettyRadio handleSelect={() => handleSelect('helper')} name='generator' value='helper' label='Helper'/>
        <PrettyRadio handleSelect={() => handleSelect('job')} name='generator' value='job' label='Job'/>
        <PrettyRadio handleSelect={() => handleSelect('task')} name='generator' value='task' label='Task'/>  
      </ul>
    </div>
  )
}

export default GeneratorTypeSelector