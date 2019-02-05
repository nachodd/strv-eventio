import React, { Component } from 'react';
import { Switch, Route, withRouter, BrowserRouter as Router } from 'react-router-dom';
import Login from '../Login/Login'
import Register from "../Register/Register"
import EventList from '../EventList/EventList'
import NotFound from '../NotFound/NotFound'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
import Loading from "../Common/Loading/Loading"
import {inject, observer} from 'mobx-react'


@inject('userStore', 'commonStore')
@observer
class App extends Component {

  componentWillMount() {
    if (!this.props.commonStore.refreshToken) {
      this.props.commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (this.props.commonStore.refreshToken) {
      this.props.userStore.pullUser()
        .finally(() => {
          this.props.commonStore.setAppLoaded()
          console.log(this.props.currentUser)
        });
    }
  }

  render() {
    if (this.props.commonStore.appLoaded) {
      return (
        <Router basename="/">
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <PrivateRoute path="/events" component={EventList}/>
            <Route component={NotFound}/>
          </Switch>
        </Router>
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
