import React, { useState, useImperativeHandle } from 'react' 

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisible = () => { setVisible(!visible) }
  useImperativeHandle(ref, () => ({ toggleVisible }))

  const hideWhenVisible = {display: visible ? 'none' : ''}
  const showWhenVisible = {display: visible ? '' : 'none'}

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable