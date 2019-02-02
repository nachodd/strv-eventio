import React, { Component } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import Login from '../Login/Login'
import NotFound from '../NotFound/NotFound'
import PrivateRoute from '../PrivateRoute/PrivateRoute'

import authStore from '@stores/authStore';
import commonStore from '@stores/commonStore';
import userStore from '@stores/userStore';

const stores = {
  authStore,
  commonStore,
  userStore,
};


class App extends Component {
  render() {
    return (
      <Provider {...stores}>
        <Router basename="/">
          <Switch>
            <Route path="/login" component={ Login } />
            <Route path="/register" component={ Login } />
            <PrivateRoute path="/settings" component={ NotFound } />
            <Route component={ NotFound } />
          </Switch>
        </Router>
      </Provider>
    );
  }
}

export default App;
