import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Login from '../Login/Login'
import EventList from '../EventList/EventList'
import NotFound from '../NotFound/NotFound'
import PrivateRoute from '../PrivateRoute/PrivateRoute'
// import Loading from '../Common/Loading/Loading'

import authStore from '@stores/authStore';
import commonStore from '@stores/commonStore';
import userStore from '@stores/userStore';
import eventStore from '@stores/eventStore';

const stores = {
  authStore,
  commonStore,
  userStore,
  eventStore
};


class App extends Component {

  componentWillMount() {
    if (!commonStore.refreshToken) {
      commonStore.setAppLoaded();
    }
  }

  componentDidMount() {
    if (commonStore.refreshToken) {
      userStore.pullUser()
        .finally(() => commonStore.setAppLoaded());
    }
  }

  render() {
    return (
      <Provider {...stores}>
        <Router basename="/">
          <Switch>
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Login } />
            <PrivateRoute path="/events" component={ EventList } />
            <Route component={ NotFound } />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
