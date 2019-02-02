import { observable, action, reaction } from 'mobx';
import api from '../api';

class CommonStore {

  // @observable appName = 'Eventio';
  @observable token = window.localStorage.getItem('jwt');
  @observable refreshToken = window.localStorage.getItem('jwt-refresh');
  @observable appLoaded = false;

  // @observable tags = [];
  // @observable isLoadingTags = false;

  constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  @action loadTags() {
    // this.isLoadingTags = true;
    // return api.Tags.getAll()
    //   .then(action(({ tags }) => { this.tags = tags.map(t => t.toLowerCase()); }))
    //   .finally(action(() => { this.isLoadingTags = false; }))
  }

  @action setToken(token) {
    this.token = token;
  }
  @action setRefreshToken(refreshToken) {
    this.refreshToken = refreshToken;
  }

  @action setAppLoaded() {
    this.appLoaded = true;
  }

}

export default new CommonStore();
