import React, { useState } from 'react'
import RandomIcon from '../user/RandomIcon'
import AvatarImg from '../avatar/InlinePicture'
import * as Ctx from '../../../utils/contexts'
import UserSection from './UserSection'
import UserFriendBar from './UserFriendsBar'
import EditProfile from '../edit/EditProfile'
import UserOptions from '../user/Options'
import userIdComparer from '../../../utils/userIdComparer'
import IncomingRequest from './IncomingRequest'


export default _ => {
  const [ statsToView, setStatsToView ] = useState('')

  return (
    <Ctx.ViewUserStatsContext.Provider value={{value: statsToView, set: val => setStatsToView(val)}}>
      <Ctx.UserDataContext.Consumer>
        {userData =>
          <>
            { userData._id && !userIdComparer(userData._id) &&
              <IncomingRequest username={userData.username} userId={userData._id}/>
            }
            <div id="UserSection">
              { userData._id && !userIdComparer(userData._id) &&
                <UserOptions/>
              }
              <h1 id="UserNames">
                {`${userData.firstname} ${userData.lastname}`}
                { !userData.avatarUrl || userData.avatarUrl === 'removed' 
                    ? <RandomIcon userId={ userData._id }/>
                    : <AvatarImg 
                        src={ userData.avatarUrl }
                        userId={ userData._id }
                      />
                }
              </h1>
              <UserSection userData={ userData }/>   
            </div>
            {userData.followers !== null &&
              <UserFriendBar 
                userId={userData._id} 
                username={userData.username}
              />
            }
            {userIdComparer(userData._id) &&
              <h2>
                <EditProfile/>
              </h2> 
            }
          </>
        }
      </Ctx.UserDataContext.Consumer>
    </Ctx.ViewUserStatsContext.Provider>
  )
}