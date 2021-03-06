import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-regular-svg-icons'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IncomingReqsContext } from '../../../utils/contexts'
import rejectOrAccept from '../../../actionHandlers/RejectAcceptReq'
import useTooltip from '../../../hooks/AnotherProfile/useTooltip'


export default ({ reqId, callback, withToolTip }) => {
  const [ loading, setLoading ] = useState(false)
   
  const component = <IncomingReqsContext.Consumer>
                      {({ requests, set }) =>
                        <FontAwesomeIcon      
                          id={ loading? 'todoDeletingSpinner' : 'RejectRequest' }
                          icon={ loading ? faSpinner : faTimesCircle }
                          onClick={async _ => {
                            setLoading(true)
                            set(requests - 1)
                            rejectOrAccept(
                              reqId,
                              val => setLoading(val),
                              callback,
                              false
                            )
                          }}
                        />
                      }
                    </IncomingReqsContext.Consumer>
  
  const output = useTooltip(component, withToolTip, 'Reject', loading)

  return output
}