import React, { memo } from 'react'
import Navbar from '../components/navbar/index'
import SignupForm from '../forms/SignupForm'
import { BrightThemeContext } from '../utils/contexts'

export default memo(_ => {
  document.title = 'TooDooDoo - Create account'

  return(
    <BrightThemeContext.Consumer>
      {theme =>
        <>
          <Navbar/>
          <div className="signupFormPage">
            <h1
              id="headline"
              className={`${theme ? 'Bright' : 'Dark'}Headline`}
            >
              Create your account
            </h1>
            <SignupForm theme={theme}/>
          </div>
        </>
      }
    </BrightThemeContext.Consumer>
  )
})