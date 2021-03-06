import React, { useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/navbar'
import Stack from '../components/stack-page'
import { BrightThemeContext } from '../utils/contexts'


export default _ => {
  document.title = 'IDiary Stack'
  
  useEffect(_ => window.scrollTo(0, 0), [ ])
  
  return(
    <>
      <Navbar/>
      <BrightThemeContext.Consumer>
        {theme => 
          <div className={`${theme? 'Bright' : 'Dark'}Page Page`}>
            <Stack/>
          </div>
        }
      </BrightThemeContext.Consumer>
      <Footer/>
    </>
  )
}