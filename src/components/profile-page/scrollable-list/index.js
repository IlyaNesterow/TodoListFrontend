import React, { useContext, useState } from 'react'
import { UserDataContext, SetItemToDeleteContext, FollowControlsContext } from '../../../utils/contexts'
import Followers from './lists/Followers'
import Following from './lists/Following'
import IncomingReqs from './lists/IncomingReqs'
import SentReqs from './lists/SentReqs'
import Blacklist from './lists/Blacklist'
import Spinner from '../../spiners/BigSpinner'
import usePaginator from '../../../hooks/Profile/usePagination'
import useScrollableList from '../../../hooks/useScrollableList'
import userIdComparer from '../../../utils/userIdComparer'


export default ({ category, userId }) => {
  const UserData = _ => useContext(UserDataContext)
  
  const [ page, setPage ] = useState(1)
  
  const [ hasNextPage, setHasNextPage, info, loading, setItemToDelete ] = usePaginator(category, {
    'Followers' : UserData().followers,
    'Following' : UserData().following,
    'Sent Requests' : UserData().requestsTo !== undefined ? UserData().requestsTo : null,
    'Incoming Requests' : UserData().requestsFrom !== undefined ? UserData().requestsFrom : null,
    'Blacklist': UserData().blockedUsers !== undefined ? UserData().blockedUsers : null
  }, userId, page, val => setPage(val))
  
  useScrollableList(page, setHasNextPage, hasNextPage, setPage)

  return(
    <div id="scrollableList">
      <SetItemToDeleteContext.Provider value={setItemToDelete}>
        <UserDataContext.Consumer>
          {data => 
            <>
              <FollowControlsContext.Provider value={userIdComparer(data._id)}>
                <>
                  { category === 'Followers' && 
                    <Followers 
                      followersCount={data.followers} 
                      data={info}
                      userId={data._id}
                      username={data.username}
                    />
                  }
                  { category === 'Following' && 
                    <Following 
                      followingCount={data.following} 
                      data={info}                
                      userId={data._id}
                      username={data.username}
                    /> 
                  }
                </>
              </FollowControlsContext.Provider>
              { category === 'Incoming Requests' && <IncomingReqs incomingReqCount={data.requestsFrom} data={info}/> }
              { category === 'Sent Requests'  && <SentReqs sentReqCount={data.requestsTo} data={info}/> }
              { category === 'Blacklist' && <Blacklist blacklistLength={data.blockedUsers} data={info}/> }
            </>
          }
        </UserDataContext.Consumer>
      </SetItemToDeleteContext.Provider>
      { loading && <Spinner/> }
    </div>
  )
}