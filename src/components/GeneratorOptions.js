import React from 'react'
import Controller from './OptionFieldsets/Controller'
import Scaffold from './OptionFieldsets/Scaffold'

function GeneratorOptions({generator, handleOptionPairSelectChange, handleOptionPairTextChange, handleAddOptionPair, handleNameChange, handleOptionsChange, fieldPairs}) {
  
  if(generator === 'scaffold') {
    return <Scaffold fieldPairs={fieldPairs} handleAddOptionPair={handleAddOptionPair} handleOptionPairTextChange={handleOptionPairTextChange} handleOptionPairSelectChange={handleOptionPairSelectChange} handleNameChange={handleNameChange} handleOptionsChange={handleOptionsChange}/>
  } else if(generator === 'controller') {
    return <Controller handleNameChange={handleNameChange} handleOptionsChange={handleOptionsChange}/>
  }
}

export default GeneratorOptions