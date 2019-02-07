import React, { Component } from 'react';
import { Switch, Route, withRouter} from 'react-router-dom';
import LoginRegister from '../../pages/LoginRegister/LoginRegister'
import Events from '../../pages/Events/Events'
import EventCreate from '../../pages/EventCreate/EventCreate'
import NotFound from '../../pages/NotFound/NotFound'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Loading from "../Common/Loading/Loading"
import {inject, observer} from 'mobx-react'
import './App.scss'

@inject('userStore', 'commonStore')
@withRouter
@observer
class App extends Component {

  componentWillMount() {
    // fix for body background
    document.body.classList.add('white');
    document.body.classList.remove('gray');

    if (!this.props.commonStore.refreshToken) {
      this.props.commonStore.setAppLoaded();
    }
  }

  async componentDidMount() {
    try {
      if (this.props.commonStore.refreshToken) {
        await this.props.userStore.pullUser()
        if (!this.props.userStore.currentUser) {
          this.props.history.replace('/login')
        } else {
          // user exists, gonna be redirected so change the background
          document.body.classList.remove('white');
          document.body.classList.add('gray');
        }
      } else {
        this.props.history.replace('/login')
      }
    } catch (e) {
      this.props.history.replace('/login')
    } finally {
      this.props.commonStore.setAppLoaded()
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <Switch>
          <Route path="/login" component={LoginRegister}/>
          <Route path="/register" component={LoginRegister}/>
          <PrivateRoute path="/events" component={Events}/>
          <PrivateRoute path="/create-event" component={EventCreate}/>
          <Route component={NotFound}/>
        </Switch>
      )
    }
    else {
      return (
        <div className="app_loading-container">
          <Loading color="gray"/>
        </div>
      )
    }
  }
}

export default App;
