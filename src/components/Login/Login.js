import React from 'react';
import Button from '../Common/Button/Button'
import Input from "../Common/Input/Input"
import LoginRegisterHOC from '../Common/LoginRegisterHoc/LoginRegisterHoc'
import './Login.scss'
import {observer} from 'mobx-react'


// renombrar esta clase como LoginForm
const Login = observer((props) => {

  const { values, inProgress, error, errorBag } = props.authStore
  const { handleInputChange, handleSubmitForm } = props

  return (
    <form className="loginRegisterForm" onSubmit={(e) => handleSubmitForm(e, 'login')}>
      <Input label="Email" name="email"
             type="text"
             change={handleInputChange}
             value={values.email}
             error={error}
             errorMsg={errorBag.email}/>
      <Input label="Password" name="password"
             type="password"
             change={handleInputChange}
             value={values.password}
             error={error}
             errorMsg={errorBag.password}/>
      <Button color="green" type="submit" loadingState={inProgress}>
        SING IN
      </Button>
    </form>

  )
})


export default LoginRegisterHOC(Login)