import React, { useEffect, useContext, useRef } from 'react'
import editMsg from '../../../actionHandlers/EditMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import * as Ctx from '../../../utils/contexts'


export default ({ messageInput, text }) => {
  const CurrentConv = _ => useContext(Ctx.CurrentlyOpenedConvContext)
  const conv = useRef(CurrentConv().value)

  useEffect(_ => {
    messageInput.current.value = text
  }, [ messageInput, text ]);
  
  return(
    <Ctx.SetMessageToEditLocallyContext.Consumer>
      {({ value, set }) =>
        <Ctx.SetMessageContext.Consumer>
          {setMessage =>
            <Ctx.SetConvToEditContext.Consumer>
              {updateConv => 
                <div 
                  id="EditMsgBtn"
                  onClick={async _ => 
                    await editMsg(conv.current, value, messageInput, set, setMessage.edit, updateConv)
                  }
                >
                  <FontAwesomeIcon
                    icon={faCheck}
                  />
                </div>
              }
            </Ctx.SetConvToEditContext.Consumer>
          }
        </Ctx.SetMessageContext.Consumer>
      }
    </Ctx.SetMessageToEditLocallyContext.Consumer>
  )
}