import React from 'react'
import { Link, matchPath, withRouter } from 'react-router-dom'
import './Header.scss'
import {inject} from "mobx-react"
import {toJS} from "mobx"


@withRouter
@inject('authStore', 'userStore')
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
    this.props.history.back();
  }

  handleLogout = () =>
    this.props.authStore.logout()
      .then(() => this.props.history.replace('/login'));

  render() {
    const user = toJS(this.props.userStore.currentUser)
    const initials = user.firstName.charAt(0) + user.lastName.charAt(0)
    const isInsideEvent = !!matchPath(this.props.location.pathname, '/event/:id');

    return (
      <nav>
        <div className="nav_logo">
          <span className="black">E.</span>
        </div>

        { isInsideEvent ?
          <div className="nav_back">
          <span onClick={this.goBack}>
            <span className="arrow">
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

      </nav>

    )

  }

}

export default Header