import React from 'react';
import Button from '../Common/Button/Button'
import Input from "../Common/Input/Input"
import LoginRegisterHOC from '../Common/LoginRegisterHoc/LoginRegisterHoc'
import Loading from "~/Common/Loading/Loading"
import './Register.scss'
import {observer} from 'mobx-react'
import {Redirect} from "react-router-dom"

const Register = observer((props) => {

  const { values, inProgress, error, errorMsg, errorBag } = props.authStore
  const { currentUser, loadingUser } = props.userStore
  const { handleInputChange, handleSubmitForm } = props

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

  return (
    <div>
      <div className="title">Get Started absolutely free.</div>
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


export default LoginRegisterHOC(Register)