import { observable, action, computed } from 'mobx'
import api from '../api'
import userStore from './userStore'
import commonStore from './commonStore'

class AuthStore {
  @observable inProgress = false
  @observable values = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    passwordType: 'password',
  }
  @observable errorMsg = ''
  @observable errorBag = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
  }
  @computed get error() {
    return this.errorMsg !== ''
  }

  @action setField(field, value) {
    this.values[field] = value
  }

  // @action setFirstName(firstName) { this.values.firstName = firstName }
  // @action setLastName(lastName) { this.values.lastName = lastName }
  // @action setEmail(email) { this.values.email = email }
  // @action setPassword(password) { this.values.password = password }
  // @action setPasswordType(passwordType) { this.values.passwordType = passwordType }

  @action setErrorMsg(errorMsg) { this.values.errorMsg = errorMsg }
  @action reset() {
    this.values.firstName = ''
    this.values.lastName = ''
    this.values.email = ''
    this.values.password = ''
    this.values.repeatPassword = ''
    this.values.passwordType = 'password'
    this.errorMsg = ''
  }
  @action login() {
    this.inProgress = true
    this.errorMsg = ''
    this.errorBag.email = ''
    this.errorBag.password = ''
    return api.Auth.login(this.values.email, this.values.password)
      .then((resp) => {
        const {id, email, firstName, lastName} = resp
        userStore.setCurrentUser({
          id, email, firstName, lastName
        })
      })
      .catch(action((err) => {
        this.parseErrorMsg(err.response.body)
        throw err
      }))
      .finally(action(() => { this.inProgress = false }))
  }

  @action
  parseErrorMsg(reqBody) {
    if (reqBody.error) {
      switch (reqBody.error) {
        case "User.InvalidPassword":
          this.errorMsg = "Oops! That email and password combination is not valid."
          break;
        case "Validation":
          this.errorMsg = "There was some errors while processing your request"
          if (reqBody.errors && Array.isArray(reqBody.errors)) {
            reqBody.errors.forEach((err) => {
              if (err.context.key && (err.context.key in this.errorBag)) {
                this.errorBag[err.context.key] = err.message
              }
            })
          }
          break;
        default:
          this.errorMsg = "There was some errors while processing your request";
          break;
      }
    }
  }

  @action register() {
    debugger
    if (this.values.password !== this.values.repeatPassword) {
      this.errorMsg = "Passwords don't match"
      this.errorBag.password = "Passwords don't match"
      this.errorBag.repeatPassword = "Passwords don't match"
      return Promise.reject("Passwords don't match");
    }
    this.inProgress = true
    return api.Auth.register(this.values.firstName, this.values.lastName, this.values.email, this.values.password)
      // must login in order to get the token
      .then(this.login)
      .catch(action((err) => {
        this.parseErrorMsg(err.response.body)
        throw err
      }))
      .finally(action(() => { this.inProgress = false }))
  }

  @action logout() {
    commonStore.setToken(undefined)
    commonStore.setRefreshToken(undefined)
    userStore.forgetUser()
    return Promise.resolve()
  }
}

export default new AuthStore()
