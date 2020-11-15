import React, { useEffect } from 'react'
import editMsg from '../../actionHandlers/EditMessage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import * as Ctx from '../../utils/contexts'


export default ({ messageInput, text }) => {
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
                <FontAwesomeIcon
                  icon={faPencilAlt}
                  onClick={async _ => 
                    await editMsg(value, messageInput, set, setMessage.edit, updateConv)
                  }
                />
              }
            </Ctx.SetConvToEditContext.Consumer>
          }
        </Ctx.SetMessageContext.Consumer>
      }
    </Ctx.SetMessageToEditLocallyContext.Consumer>
  )
}