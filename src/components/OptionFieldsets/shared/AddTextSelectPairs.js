import React from 'react'
import TextSelectPair from '../../form/TextSelectPair'
import * as Constants from '../../../constants/rails/index.js';

function AddTextSelectPairs({fieldPairs, handleOptionPairTextChange, handleOptionPairSelectChange, handleAddOptionPair}) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor="controller-actions">Add fields</label>
      <fieldset className="ml-2 space-y-2">
        {fieldPairs.map((pair, index) => (
          <TextSelectPair textValue={pair.field} selectValue={pair.fieldType} index={index} key={index} handleOptionPairTextChange={handleOptionPairTextChange} handleOptionPairSelectChange={handleOptionPairSelectChange} options={Constants.DATA_TYPE_OPTIONS} />
        ))}
      </fieldset>
      <button type="button" className="small w-10 ml-auto" onClick={handleAddOptionPair}>+</button>
      {/* TODO: add way to remove! */}
    </div>
  )
}

export default AddTextSelectPairs