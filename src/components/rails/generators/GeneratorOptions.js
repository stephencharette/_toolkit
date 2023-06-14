import React from 'react'
import Controller from './option_fieldsets/Controller'
import Scaffold from './option_fieldsets/Scaffold'
import Model from './option_fieldsets/Model'
import Migration from './option_fieldsets/Migration'
import Mailer from './option_fieldsets/Mailer'
import Helper from './option_fieldsets/Helper'
import Job from './option_fieldsets/Job'
import Task from './option_fieldsets/Task'

function GeneratorOptions({generator, handleOptionPairSelectChange, handleOptionPairTextChange, handleAddOptionPair, handleNameChange, handleOptionsChange, fieldPairs, handleActionChange, handleAddAction, actions}) {
  switch(generator) {
    case 'scaffold':
      return <Scaffold fieldPairs={fieldPairs} handleAddOptionPair={handleAddOptionPair} handleOptionPairTextChange={handleOptionPairTextChange} handleOptionPairSelectChange={handleOptionPairSelectChange} handleNameChange={handleNameChange} handleOptionsChange={handleOptionsChange}/>
    case 'controller':
      return <Controller handleNameChange={handleNameChange} handleOptionsChange={handleOptionsChange} handleActionChange={handleActionChange} handleAddAction={handleAddAction} actions={actions}/>
    case 'model':
      return <Model handleNameChange={handleNameChange} handleOptionsChange={handleOptionsChange}/>
    case 'migration':
      return <Migration handleAddOptionPair={handleAddOptionPair} handleOptionPairTextChange={handleOptionPairTextChange} handleOptionPairSelectChange={handleOptionPairSelectChange} fieldPairs={fieldPairs} handleNameChange={handleNameChange} handleOptionsChange={handleOptionsChange}/>
    case 'mailer':
      return <Mailer actions={actions} handleAddAction={handleAddAction} handleActionChange={handleActionChange} handleNameChange={handleNameChange} handleOptionsChange={handleOptionsChange}/>
    case 'helper':
      return <Helper handleNameChange={handleNameChange} handleOptionsChange={handleOptionsChange}/>
    case 'job':
      return <Job handleNameChange={handleNameChange} handleOptionsChange={handleOptionsChange}/>
    case 'task':
      return <Task actions={actions} handleAddAction={handleAddAction} handleActionChange={handleActionChange} handleNameChange={handleNameChange} handleOptionsChange={handleOptionsChange}/>
    default:
      // TODO: add instructions here.
  }
}

export default GeneratorOptions