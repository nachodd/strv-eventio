import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Logo from '~/Common/Logo/Logo'
import SidePanel from '~/Common/SidePanel/SidePanel'
import HeadSingUpIn from '~/Common/HeadSingUpIn/HeadSingUpIn'
import ContentContainer from '~/Common/ContentContainer/ContentContainer'
// import Button from '~/Common/Button/Button'
// import Input from "~/Common/Input/Input"
import Loading from "~/Common/Loading/Loading"
import '../../Login/Login.scss'

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
      // this.props.authStore.setEmail("steverogers@strv.com");
      // this.props.authStore.setPassword("am3riCa");
    }

    handleInputChange = e => {
      this.props.authStore.setField(e.target.name, e.target.value)
    }
    handleSubmitForm = (e, action) => {
      e.preventDefault();
      this.props.authStore[action]()
        .then(() => {
          this.props.history.replace('/events')
        });
    };

    render() {
      const { currentUser, loadingUser } = this.props.userStore
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
          <Logo/>
          <SidePanel/>
          <HeadSingUpIn type='singUp'/>

          <ContentContainer>

            <LoginRegisterForm
              authStore={this.props.authStore}
              userStore={this.props.userStore}
              handleInputChange={this.handleInputChange}
              handleSubmitForm={this.handleSubmitForm}
            />

          </ContentContainer>
        </div>
      )
    }
  }

  return LoginRegisterHoc

}




// export default LoginRegisterHoc