import { observable, action } from 'mobx';
import api from '../api';
import commonStore from '@stores/commonStore';

class UserStore {

  @observable currentUser;
  @observable loadingUser = false;

  @action pullUser() {
    this.loadingUser = true;
    let refreshToken = commonStore.refreshToken
    return api.Auth.refreshToken(refreshToken)
      .then(action(user => {
        const {id, email, firstName, lastName} = user
        this.currentUser = {
          id, email, firstName, lastName
        }
      }))
      .finally(action(() => { this.loadingUser = false; }))
  }
  @action setCurrentUser(currentUser) {
    this.currentUser = currentUser;
  }

  @action forgetUser() {
    this.currentUser = undefined;
  }

}

export default new UserStore();
