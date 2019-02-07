import React from 'react'
import LoginRegisterHOC from "../../components/Common/LoginRegisterHoc/LoginRegisterHoc"
import SidePanel from '~/Common/SidePanel/SidePanel'
import FormContainer from '~/Common/FormContainer/FormContainer'
import {observer} from 'mobx-react'
import LoginForm from "~/LoginForm/LoginForm"
import RegisterForm from "~/RegisterForm/RegisterForm"
import Header from '../../components/Common/Header/Header'
import Content from "../../components/Common/Content/Content"
import './LoginRegister.scss'

const LoginRegister = observer((props) => {

  const isLogin = props.location.pathname==="/login"
  const title = isLogin
    ? 'Sing In to Eventio.'
    : 'Get Started absolutely free.'
  const page = isLogin ? 'login' : 'register'

  return (
    <div className='login-register_container'>
      <Header page={page}/>
      <SidePanel/>

      <Content>
        <FormContainer
          title={title}
          subtitle="Enter your details below."
          errorMsg={props.authStore.errorMsg}>
          {
            isLogin
              ? <LoginForm {...props} />
              : <RegisterForm {...props} />
          }
        </FormContainer>
      </Content>
    </div>
  )
})

export default LoginRegisterHOC(LoginRegister)