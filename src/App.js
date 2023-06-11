import './App.css';
import Sidebar from './components/Sidebar';
import OpenSidebarButton from './components/OpenSidebarButton';
import { useState } from 'react';
import GeneratorTypeSelector from './components/GeneratorTypeSelector';
import Result from './components/Result';
import GeneratorOptions from './components/GeneratorOptions';
import * as Constants from './constants/rails/index.js';

function App() {
  const [generator, setGenerator] = useState('...')
  // TODO: make NAME a constant in defaults or something...
  const [name, setName] = useState('NAME')
  const [options, setOptions] = useState([])
  const [fieldPairs, setFieldPairs] = useState([{ field: '', fieldType: '' }])

  const handleGeneratorSelect = type => {
    setGenerator(type)
    setOptions([])
    setName('NAME')
  }

  const handleOptionPairTextChange = (event, index) => {
    const value = event.target.value
    setFieldPairs((previousPairs) => {
      const updatedPairs = [...previousPairs]
      updatedPairs[index].field = value
      return updatedPairs
    })
  }

  const handleOptionPairSelectChange = (event, index) => {
    const value = event.target.value
    setFieldPairs((previousPairs) => {
      const updatedPairs = [...previousPairs]
      if(value === Constants.DATA_TYPE_OPTIONS[0].label) {
        updatedPairs[index].fieldType = ''
      }
      else {
        updatedPairs[index].fieldType = value
      }

      return updatedPairs
    })
  }

  const handleAddOptionPair = () => {
    setFieldPairs((previousOptions) => [...previousOptions, { field: '', fieldType: '' }])
  }

  const handleNameChange = event => {
    setName(event.target.value)
  }

  const handleOptionsChange = event => {
    const inputType = event.target.type
    if(inputType === "text") {
      const { name, value } = event.target

      const index = options.findIndex(value => RegExp(name).test(value))
      const newOption = `${name}${value}`
      
      if(index === -1) {
        return setOptions([...options, newOption])
      }

      let newOptions = [...options]
      newOptions.splice(index)

      if(value === '') {
        return setOptions(newOptions)
      }

      return setOptions([...newOptions, newOption])
    } else if(inputType === "checkbox") {
      const { name, checked } = event.target
      if(checked) {
        setOptions([...options, name])
      } else {
        const updatedItems = options.filter(item => item !== name)
        setOptions(updatedItems)
      }
    }
  }

  return (
    <div className="App">
      <Sidebar />

      <div className="flex flex-col p-4 sm:ml-52 pr-30 max-w-xl">
        <div className="flex flex-col space-y-5 mb-72">
          <div className="flex items-center">
            <h1 className="font-bold text-2xl text-left">Rails Command Line Helper</h1>
            <OpenSidebarButton />
          </div>

          <GeneratorTypeSelector generator={generator} handleSelect={handleGeneratorSelect}/>

          <GeneratorOptions generator={generator} 
                            handleNameChange={handleNameChange}
                            handleOptionsChange={handleOptionsChange}
                            handleOptionPairSelectChange={handleOptionPairSelectChange}
                            handleOptionPairTextChange={handleOptionPairTextChange}
                            handleAddOptionPair={handleAddOptionPair}
                            fieldPairs={fieldPairs}
                            />
        </div>

        <Result command={`rails generate ${generator} ${name} ${fieldPairs.filter(pair => pair.field !== '').map((pair) => `${pair.field}:${pair.fieldType}`).join(' ')} ${options.join(' ')}`}/>
      </div>


    </div>
  );
}

export default App;
