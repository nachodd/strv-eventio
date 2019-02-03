import React from 'react';
import { withRouter, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Logo from '../Common/Logo/Logo'
import SidePanel from '../Common/SidePanel/SidePanel'
import HeadSingUpIn from '../Common/HeadSingUpIn/HeadSingUpIn'
import ContentContainer from '../Common/ContentContainer/ContentContainer'
import Button from '../Common/Button/Button'
import Input from "../Common/Input/Input"
// import DevTools from 'mobx-react-devtools';
// import { parse as qsParse } from 'query-string'
import Loading from "../Common/Loading/Loading"
import './Login.scss'

@inject('authStore', 'userStore')
@withRouter
@observer
class Login extends React.Component {

  componentWillUnmount() {
    this.props.authStore.reset();
  }

  componentDidMount() {
    this.props.authStore.setEmail("steverogers@strv.com");
    this.props.authStore.setPassword("am3riCa");
  }

  handleEmailChange = e => this.props.authStore.setEmail(e.target.value);
  handlePasswordChange = e => this.props.authStore.setPassword(e.target.value);
  handleSubmitForm = (e) => {
    e.preventDefault();
    this.props.authStore.login()
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
      // const qs = this.props.location.search;
      // const eventsLocation = qs ? `/events${qs}` : "/events"
      return <Redirect to="/events"/>
    }

    const { values, inProgress, error, errorMsg, errorBag } = this.props.authStore

    return (
      <div>
        <Logo/>
        <SidePanel/>
        <HeadSingUpIn type='singUp'/>

        <ContentContainer>
          <div className="title">Sing In to Eventio.</div>
          <div className="content">
            {errorMsg ? <div className="errorMsg">{errorMsg}</div> : "Enter your details below."}
          </div>
          <form className="loginRegisterForm" onSubmit={this.handleSubmitForm}>
            <Input label="Email"
                   type="text"
                   change={this.handleEmailChange}
                   value={values.email}
                   error={error}
                   errorMsg={errorBag.email}/>
            <Input label="Password"
                   type="password"
                   change={this.handlePasswordChange}
                   value={values.password}
                   error={error}
                   errorMsg={errorBag.password}/>
            <Button color="green" type="submit" loadingState={inProgress}>
              SING IN
            </Button>
          </form>
        </ContentContainer>
      </div>
    )
  }
}


export default Login