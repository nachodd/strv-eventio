import React, { Component } from 'react';
import { Switch, Route, withRouter, BrowserRouter as Router } from 'react-router-dom';
import LoginRegisterWrapper from '../Common/LoginRegisterHoc/LoginRegisterWrapper'
import EventList from '../EventList/EventList'
import EventCreate from '../EventCreate/EventCreate'
import NotFound from '../NotFound/NotFound'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Loading from "../Common/Loading/Loading"
import {inject, observer} from 'mobx-react'


@inject('userStore', 'commonStore')
@withRouter
@observer
class App extends Component {

  componentWillMount() {
    if (!this.props.commonStore.refreshToken) {
      this.props.commonStore.setAppLoaded();
    }
  }

  async componentDidMount() {
    try {
      if (this.props.commonStore.refreshToken) {
        await this.props.userStore.pullUser()
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
          <Route path="/login" component={LoginRegisterWrapper}/>
          <Route path="/register" component={LoginRegisterWrapper}/>
          <PrivateRoute path="/events" component={EventList}/>
          <PrivateRoute path="/create-event" component={EventCreate}/>
          <Route component={NotFound}/>
        </Switch>
      )
    }
    else {
      return (
        <div className="loadingUserCont">
          <Loading color="gray"/>
        </div>
      )
    }
  }
}

export default App;
