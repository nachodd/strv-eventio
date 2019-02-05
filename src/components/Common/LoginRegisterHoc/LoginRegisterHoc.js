import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
// import Button from '~/Common/Button/Button'
// import Input from "~/Common/Input/Input"
// import '../../Login/Login.scss'

export default function LoginRegisterHOC (LoginRegisterForm) {

  @inject('authStore', 'userStore')
  @withRouter
  @observer
  class LoginRegisterHoc extends React.Component {

    componentWillMount() {
      // fix for body background
      document.body.classList.remove('gray');
      document.body.classList.add('white');
    }

    componentWillUnmount() {
      this.props.authStore.reset();
    }

    componentDidMount() {
      this.props.authStore.setField("firstName", "Nacho");
      this.props.authStore.setField("lastName", "Durand");
      this.props.authStore.setField("email", "nachodurand@gmail.com");
      this.props.authStore.setField("password", "32658999");
      this.props.authStore.setField("repeatPassword", "3265899");
    }

    handleInputChange = e => {
      this.props.authStore.setField(e.target.name, e.target.value)
    }
    handleSubmitForm = (e, action) => {
      e.preventDefault();
      this.props.authStore[action]()
        .then(() => {
          this.props.history.replace('/events')
        })
        .catch(e => console.log(e));
    };

    render() {
      return (
        <LoginRegisterForm
          {...this.props}
          handleInputChange={this.handleInputChange}
          handleSubmitForm={this.handleSubmitForm} />
      )
    }
  }

  return LoginRegisterHoc

}




// export default LoginRegisterHoc