import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App';
import * as serviceWorker from './serviceWorker';
import WebFont from 'webfontloader';
import { Provider } from 'mobx-react';
import authStore from 'stores/authStore';
import commonStore from 'stores/commonStore';
import userStore from 'stores/userStore';
import eventStore from 'stores/eventStore';
import {BrowserRouter as Router} from "react-router-dom"

WebFont.load({
  google: {
    families: [
      'Hind:300,400,500,600,700',
      'Playfair Display:400,400i,700,700i,900,900i'
    ]
  }
});


const stores = {
  authStore,
  commonStore,
  userStore,
  eventStore
};


ReactDOM.render((
  <Provider {...stores}>
    <Router basename="/">
      <App />
    </Router>
  </Provider>
  ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
