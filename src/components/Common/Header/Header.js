import React from 'react'
import { Link, withRouter /*, matchPath*/ } from 'react-router-dom'
import './Header.scss'
import {inject, observer} from "mobx-react"
import {toJS} from "mobx"


@inject('authStore', 'userStore')
@withRouter
class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showMenu: false,
    };
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.closeMenu);
  }

  showMenu = (event) => {
    event.preventDefault();
    this.setState({ showMenu: true }, () => {
      document.addEventListener('click', this.closeMenu);
    });
  }

  closeMenu = (event) => {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({ showMenu: false }, () => {
        document.removeEventListener('click', this.closeMenu);
      });
    }
  }

  goBack = () => {
    this.props.history.push('/events');
  }

  handleLogout = () =>
    this.props.authStore.logout()
      .then(() => this.props.history.replace('/login'));

  render() {
    let user, initials;
    const {page} = this.props

    if (this.props.userStore.currentUser) {
      user = toJS(this.props.userStore.currentUser)
      initials = user.firstName.charAt(0) + user.lastName.charAt(0)
    }

    const showNavUser =
      ( user &&
        // page !== 'login' &&
        // page !== 'register' &&
        page !== 'create_event' )

    const logoClass = (page === 'login' || page === 'register' || page === 'not_found')
      ? 'blackOrWhite'
      : 'black'

    return (
      <header>
        <nav>
          <div className="nav_logo">
            <span className={logoClass}>E.</span>
          </div>

          { page==='in_event' ?
            <div className="nav_back">
              <span onClick={this.goBack}>
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H24V24H0V0Z" stroke="black" strokeOpacity="0.01" strokeWidth="0"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="black"/>
                  </svg>
                </span>
                <span>
                  Back to Events
                </span>
              </span>
            </div>
            : null
          }


          { showNavUser ?
            <div className="nav-user_container">
              <span className="dropdown">
                <span className="menu_container" onClick={this.showMenu}>
                  <span className="nav-user_circle">
                    {initials}
                  </span>
                  <span className="nav-user_name">
                    {user.firstName} {user.lastName}
                  </span>
                  <span>
                    &#x23F7;
                  </span>
                </span>
                {
                  this.state.showMenu ?
                    <div className="dropdown-content"
                         ref={(element) => {
                           this.dropdownMenu = element;
                         }}>
                      <Link to="#"><p>Profile</p></Link>

                      <p onClick={this.handleLogout}>Log out</p>
                    </div>
                    : null
                }
              </span>
            </div>
            : null
          }

          { page==='create_event' ?
            <div className="nav-close_event">
              <span onClick={() => this.goBack()}>
                <span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0 0H24V24H0V0Z" stroke="black" strokeOpacity="0.01" strokeWidth="0"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z" fill="black"/>
                  </svg>
                </span>
                <span>
                  Close
                </span>
              </span>
            </div>
            : null
          }

          { !showNavUser && (page==='login' || page==='not_found') ?
            <div className='nav-singupin-wrapper'>
              <div className='headSingUpIn'>
                Don't have account? <Link to="/register">SING UP</Link>
              </div>
            </div>
            : null
          }

          { !showNavUser && (page==='register') ?
            <div className='nav-singupin-wrapper'>
              <div className='headSingUpIn'>
                Already have an account? <Link to="/login">SING IN</Link>
              </div>
            </div>
            : null
          }

        </nav>
      </header>
    )

  }

}

export default Header