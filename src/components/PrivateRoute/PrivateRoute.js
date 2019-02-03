import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

@inject('userStore', 'commonStore')
@observer
class PrivateRoute extends React.Component {
  render() {
    const { userStore, ...restProps } = this.props;

    if (userStore.currentUser) {
      return <Route {...restProps} />
    }
    // Pass query parameter for list?
    // const qs = this.props.location.search;
    // const loginLocation = qs ? `/login${qs}` : "/login"
    return <Redirect to='/login' />;
  }
}

export default PrivateRoute