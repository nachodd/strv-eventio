import React, { Component } from 'react';
import { Switch, Route, Router } from 'react-router-dom';


class App extends Component {
  render() {
      <Router basename="/">
        <Switch>
          <Route exact path="/login" component={ Login } />
          {/*<Route exact path="/signup" component={ Signup } />*/}
          {/*<Route exact path="/login" component={ Login } />*/}
          {/*<Route exact path="/forgotpassword" component={ ForgotPassword } />*/}
          {/*<Route exact path="/forgotpassword/sent" component={ PasswordSent } />*/}
          {/*<Route component={ NotFound } />*/}
        </Switch>
      </Router>
    );
  }
}

export default App;
