import React, { useEffect, useState, useRef, memo } from 'react'
import * as Ctx from '../utils/contexts'
import FormSpinner from '../components/spiners/FormSpinner'
import useComplainLog from '../hooks/useComplainLog'
import Password from '../components/FormComponents/Password'
import setNewPassword from '../actionHandlers/updateuser/SetNewPassword'


export default memo(({ unsetEditing }) => {
  const [ submiting, setSubmiting ] = useState(false)
  const [ setError, complainLog ] = useComplainLog()

  const oldPw = useRef(null)
  const newPw = useRef(null)
  const newPw2 = useRef(null)

  useEffect(_ => oldPw.current && oldPw.current.focus())

  return(
    <form id="FormInModal" className={`${submiting? 'FormWithSpinner' : ''}`}>
      <FormSpinner/>
      { complainLog }
      <p>Enter your old password</p>
      <Password placeholder="old password" ref={oldPw}/>
      <p>Enter your new password</p>
      <Password placeholder="new password" ref={newPw}/>
      <p>Repeat your new password</p>
      <Password placeholder="new password repeat" ref={newPw2}/>
      <Ctx.UserDataContext.Consumer>
        {data =>
          <button
            onClick={async e => 
              await setNewPassword(
                e, 
                {
                  oldPw: oldPw.current.value, 
                  newPw1: newPw.current.value, 
                  newPw2: newPw2.current.value,
                }, 
                setSubmiting, 
                unsetEditing,
                data._id,
                setError
              )
            }
          >
            Edit
          </button>
        }
      </Ctx.UserDataContext.Consumer>
    </form>
  )
})