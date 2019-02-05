import React from 'react';
import Button from '../Common/Button/Button'
import Input from "../Common/Input/Input"
import LoginRegisterHOC from '../Common/LoginRegisterHoc/LoginRegisterHoc'
import './Login.scss'
import {observer} from 'mobx-react'

const Login = observer((props) => {

  const { values, inProgress, error, errorMsg, errorBag } = props.authStore
  const { handleInputChange, handleSubmitForm } = props

  return (
    <div>
      <div className="title">Sing In to Eventio.</div>
      <div className="content">
        {errorMsg ? <div className="errorMsg">{errorMsg}</div> : "Enter your details below."}
      </div>
      <form className="loginRegisterForm" onSubmit={handleSubmitForm}>
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
    </div>
  )
})


export default LoginRegisterHOC(Login)