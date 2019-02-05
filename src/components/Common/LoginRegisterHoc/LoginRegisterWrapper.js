import React from 'react'
import {Redirect} from "react-router-dom"
import LoginRegisterHOC from "./LoginRegisterHoc"
import Logo from '~/Common/Logo/Logo'
import SidePanel from '~/Common/SidePanel/SidePanel'
import HeadSingUpIn from '~/Common/HeadSingUpIn/HeadSingUpIn'
import ContentContainer from '~/Common/FormContainer/FormContainer'
import Loading from "~/Common/Loading/Loading"
import {observer} from 'mobx-react'
import '~/Login/Login.scss'
import Login from "../../Login/Login"
import Register from "../../Register/Register"


const LoginRegisterWrapper = observer((props) => {

  const { currentUser, loadingUser } = props.userStore

  if (loadingUser) {
    return (
      <div className="loadingUserCont">
        <Loading color="gray"/>
      </div>
    )
  }
  if (currentUser) {
    return <Redirect to="/events"/>
  }

  const isLogin = props.location.pathname==="/login"
  const title = isLogin
    ? 'Sing In to Eventio.'
    : 'Get Started absolutely free.'

  return (
    <div>
      <Logo/>
      <SidePanel/>
      <HeadSingUpIn type={isLogin ? 'singUp' : 'singIn'}/>

      <ContentContainer
        title={title}
        errorMsg={props.authStore.errorMsg}>
        {
          isLogin
            ? <Login {...props} />
            : <Register {...props} />
        }
      </ContentContainer>
    </div>
  )
})

export default LoginRegisterHOC(LoginRegisterWrapper)