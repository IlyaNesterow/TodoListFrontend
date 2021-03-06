import React, { useState, useRef, memo } from 'react'
import FormSpinner from '../components/spiners/FormSpinner'
import Password from '../components/FormComponents/Password'
import setNewPassword from '../actionHandlers/SetNewPassword'
import useComplainLog from '../hooks/useComplainLog'


export default memo(({theme}) => {
  const [ errorResetingPw, setErrorResetingPw ] = useState(false)
  const [ submiting, setSubmiting ] = useState(false)

  const [ setError, complainLog ] = useComplainLog()
  
  const password1 = useRef(null)
  const password2 = useRef(null)
  
  const formClassName = `${theme? 'Bright': 'Dark'}LoginForm ${submiting? 'FormWithSpinner' : ''}`

  return(
    <form className={formClassName}>
      { complainLog }
      <FormSpinner/>
      {!errorResetingPw &&
        <>
          <Password ref={password1}/>
          <Password ref={password2}/>
          <button onClick={e =>
            setNewPassword(
              e,
              password1.current.value,
              password2.current.value,
              setErrorResetingPw,
              setSubmiting,
              setError
            )
          }>
            Reset
          </button>
        </>
      }
    </form>
  )
})