import React from 'react';
import Button from '../Common/Button/Button'
import Input from "../Common/Input/Input"
import LoginRegisterHOC from '../Common/LoginRegisterHoc/LoginRegisterHoc'
import './LoginForm.scss'
import {observer} from 'mobx-react'
import {Link} from "react-router-dom"
const LoginForm = observer((props) => {

  const { values, inProgress, errorBag, passwordRevealed } = props.authStore
  const { handleInputChange, handleSubmitForm, handlePasswordRevealer } = props

  return (
    <form className="login-register_form" onSubmit={(e) => handleSubmitForm(e, 'login')}>
      <Input label="Email" name="email"
             type="text"
             change={handleInputChange}
             value={values.email}
             errorMsg={errorBag.email}/>
      <Input label="Password" name="password"
             type="password"
             change={handleInputChange}
             passwordRevealed={passwordRevealed}
             passwordRevealerHandler={handlePasswordRevealer}
             showPasswordRevealer={true}
             value={values.password}
             errorMsg={errorBag.password}/>

      <div className='login-register_singuplink'>
        Don't have account? <Link to="/register">SING UP</Link>
      </div>

      <div className='login-register_button'>
        <Button color="green" type="submit" loadingState={inProgress}>
          SING IN
        </Button>
      </div>
    </form>

  )
})


export default LoginRegisterHOC(LoginForm)