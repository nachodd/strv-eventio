import React from 'react';
import Button from '../Common/Button/Button'
import Input from "../Common/Input/Input"
import LoginRegisterHOC from '../Common/LoginRegisterHoc/LoginRegisterHoc'
import './LoginForm.scss'
import {observer} from 'mobx-react'
const LoginForm = observer((props) => {

  const { values, inProgress, errorBag } = props.authStore
  const { handleInputChange, handleSubmitForm } = props

  return (
    <form className="loginRegisterForm" onSubmit={(e) => handleSubmitForm(e, 'login')}>
      <Input label="Email" name="email"
             type="text"
             change={handleInputChange}
             value={values.email}
             errorMsg={errorBag.email}/>
      <Input label="Password" name="password"
             type="password"
             change={handleInputChange}
             value={values.password}
             errorMsg={errorBag.password}/>
      <Button color="green" type="submit" loadingState={inProgress}>
        SING IN
      </Button>
    </form>

  )
})


export default LoginRegisterHOC(LoginForm)