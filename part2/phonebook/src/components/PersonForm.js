import React from 'react'
import Input from "./Input";

const PersonForm = ({ onSubmit, fields}) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        {fields.map(f => <Input key={f.label} label={f.label} value={f.value} onChange={f.onChange} />)}
      </div>
      <div>
        <button type='submit' >add</button>
      </div>
    </form>
  )
}

export default PersonForm
