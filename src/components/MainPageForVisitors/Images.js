import React from 'react'
import Image from './Image'
import FirstImage from './FirstImage'
import BrightUserPage from '../../assets/computers/BrightPageUI.png'
import DarkUserPage from '../../assets/computers/DarkPageUI.png'
import BrightTodoPage from '../../assets/computers/BrightTodos.png'
import DarkTodoPage from '../../assets/computers/DarkTodos.png'
import BrightConversation from '../../assets/computers/BrightConversation.png'
import DarkConversation from '../../assets/computers/DarkConversation.png'
import BrightAnotherUser from '../../assets/computers/BrightAnotherProfile.png'
import DarkAnotherUser from '../../assets/computers/DarkAnotherUser.png'
import DarkAnotherTodos from '../../assets/computers/DarkFriendTodos.png'
import BrightAnotherTodos from '../../assets/computers/BrightFriendTodos.png'
import BrightTodosByTag from '../../assets/computers/BrightTodoByTag.png'
import DarkTodosByTag from '../../assets/computers/DarkTodoByTag.png'
import BrightMobileUserPage from '../../assets/mobile/BrightProfile.JPG'
import DarkMobileUserPage from '../../assets/mobile/DarkProfile.JPG'
import BrightMobileTodos from '../../assets/mobile/BrightTodos.JPG'
import DarkMobileTodos from '../../assets/mobile/DarkTodos.JPG'
import BrightMobileConversation from '../../assets/mobile/BrightConversations.JPG'
import DarkMobileConversation from '../../assets/mobile/DarkConversations.JPG'
import BrightAnotherUserMobile from '../../assets/mobile/BrightAnotherProfile.JPG'
import DarkAnotherUserMobile from '../../assets/mobile/DarkAnotherProfile.JPG'
import useResizer from '../../hooks/useWindowResizer'


export default ({ theme }) => {
  const [ width ] = useResizer()

  return(
    <>
      <FirstImage width={ width } theme={ theme } />
      <Image 
        src={ 
          width > 540
            ? theme ? BrightTodoPage : DarkTodoPage 
            : theme ? BrightMobileTodos : DarkMobileTodos
        }
        alt="Todos"
        content="Collect & manage todos"  
      />
      <Image
        src={ 
          width > 540
            ? theme ? BrightUserPage : DarkUserPage 
            : theme ? BrightMobileUserPage : DarkMobileUserPage
        }
        alt="profile page"
        content="Manage your profile"
        sideEffect
      />
      <Image
        src={ 
          width > 540
            ? theme ? BrightConversation : DarkConversation 
            : theme ? BrightMobileConversation : DarkMobileConversation 
        }
        alt="conversation page"
        content="Keep you connected with others"
      />
      <Image
        src={ 
          width > 540
            ? theme ? BrightAnotherUser : DarkAnotherUser
            : theme ? BrightAnotherUserMobile : DarkAnotherUserMobile
        }
        alt="The page of another user"
        content="View profiles of another users"
        sideEffect
      />
      {width > 540 &&
        <>
          <Image
            src={ theme ? BrightAnotherTodos : DarkAnotherTodos }
            alt="The page of todos"
            content="View todos of another users"
            sideEffect
          />
          <Image
            src={ theme ? BrightTodosByTag : DarkTodosByTag }
            alt="The page of todos"
            content="Search todos by tags"
          />
        </>
      }
    </>
  )
}