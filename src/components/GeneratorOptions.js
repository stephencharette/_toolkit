import React from 'react'
import Controller from './OptionFieldsets/Controller'
import Scaffold from './OptionFieldsets/Scaffold'
import Model from './OptionFieldsets/Model'
import Migration from './OptionFieldsets/Migration'
import Mailer from './OptionFieldsets/Mailer'
import Helper from './OptionFieldsets/Helper'
import Job from './OptionFieldsets/Job'
import Task from './OptionFieldsets/Task'

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