import React from 'react';
import Button from '../Common/Button/Button'
import Input from "../Common/Input/Input"
import LoginRegisterHOC from '../Common/LoginRegisterHoc/LoginRegisterHoc'
import './RegisterForm.scss'
import {observer} from 'mobx-react'

const RegisterForm = observer((props) => {

  const { values, inProgress, errorBag } = props.authStore
  const { handleInputChange, handleSubmitForm } = props
  console.log("inprogress", inProgress)

  return (
    <form className="loginRegisterForm" onSubmit={(e) => handleSubmitForm(e, 'register')}>
      <Input label="First name" name="firstName"
             type="text"
             change={handleInputChange}
             value={values.firstName}
             errorMsg={errorBag.firstName}/>
      <Input label="Last name" name="lastName"
             type="text"
             change={handleInputChange}
             value={values.lastName}
             errorMsg={errorBag.lastName}/>
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
      <Input label="Repeat password" name="repeatPassword"
             type="password"
             change={handleInputChange}
             value={values.repeatPassword}
             errorMsg={errorBag.repeatPassword}/>
      <Button color="green" type="submit" loadingState={inProgress}>
        SING UP
      </Button>
    </form>

  )
})


export default LoginRegisterHOC(RegisterForm)