import React from 'react'

function Checkbox(props) {
  return (
    <div className="flex items-center mb-4">
      <input id={`${props.type}-checkbox`} type="checkbox" value=""></input>
      <label htmlFor={`${props.type}-checkbox`}>{props.label}</label>
    </div>
  )
}

export default Checkbox