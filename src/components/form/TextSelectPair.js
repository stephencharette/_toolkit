import React from 'react'

function TextSelectPair({handleOptionPairTextChange, handleOptionPairSelectChange, name, options, id, index, textValue, selectValue}) {
  return (
    <div className="flex items-center space-x-2">
      <input type="text" name={`${name}-${index}`} required={true} value={textValue} placeholder='Field name' onChange={(event) => handleOptionPairTextChange(event, index)}></input>
      <select className='font-mono' name={`${name}-${index}-type`} value={selectValue} onChange={(event) => handleOptionPairSelectChange(event, index)}>
        { options.map((option, index) => (<option key={index} defaultValue={index === 0 ? 'selected' : ''} value={option.value}>{option.label}</option>)) }
      </select>
    </div>
  )
}

export default TextSelectPair