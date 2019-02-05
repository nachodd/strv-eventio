import React from 'react';
import Button from '../Common/Button/Button'
import Input from "../Common/Input/Input"
import LoginRegisterHOC from '../Common/LoginRegisterHoc/LoginRegisterHoc'
import './Register.scss'
import {observer} from 'mobx-react'

const Register = observer((props) => {

  const { values, inProgress, error, errorBag } = props.authStore
  const { handleInputChange, handleSubmitForm } = props

  return (
    <form className="loginRegisterForm" onSubmit={(e) => handleSubmitForm(e, 'register')}>
      <Input label="First name" name="firstName"
             type="text"
             change={handleInputChange}
             value={values.firstName}
             error={error}
             errorMsg={errorBag.firstName}/>
      <Input label="Last name" name="lastName"
             type="text"
             change={handleInputChange}
             value={values.lastName}
             error={error}
             errorMsg={errorBag.lastName}/>
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
      <Input label="Repeat password" name="repeatPassword"
             type="password"
             change={handleInputChange}
             value={values.repeatPassword}
             error={error}
             errorMsg={errorBag.repeatPassword}/>
      <Button color="green" type="submit" loadingState={inProgress}>
        SING UP
      </Button>
    </form>

  )
})


export default LoginRegisterHOC(Register)