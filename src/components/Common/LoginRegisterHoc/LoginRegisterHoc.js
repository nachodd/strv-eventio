import React from 'react';
import { withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';


export default function LoginRegisterHOC (LoginRegisterForm) {

  @inject('authStore', 'userStore')
  @withRouter
  @observer
  class LoginRegisterHoc extends React.Component {

    componentWillUnmount() {
      this.props.authStore.resetForm();
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

    handlePasswordRevealer = () => {
      this.props.authStore.togglePasswordRevealed()
    }

    render() {
      return (
        <LoginRegisterForm
          {...this.props}
          handleInputChange={this.handleInputChange}
          handleSubmitForm={this.handleSubmitForm}
          handlePasswordRevealer={this.handlePasswordRevealer}/>
      )
    }
  }

  return LoginRegisterHoc
}