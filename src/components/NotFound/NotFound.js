import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '~/Common/Logo/Logo'
import SidePanel from "~/Common/SidePanel/SidePanel"
import TrooperBackground from "~/Common/TrooperBackground/TrooperBackground"
import ErrorContainer from "~/Common/ErrorContainer/ErrorContainer"
import Button from "~/Common/Button/Button"
import HeadSingUpIn from "~/Common/HeadSingUpIn/HeadSingUpIn"


const NotFound = () => {
  // setTitle('404 Error - Page not found');

  return (
    <div>
      <Logo/>
      <HeadSingUpIn type="singIn"/>
      <TrooperBackground/>
      <SidePanel/>
      <ErrorContainer>
        <div className="title">404 Error - page not found</div>
        <div className="content">
          Seems like Darth Vader just hits our website and drops it down.
          <br />
          Please press the refresh button and everything should be fine again.
        </div>
        <Button type="refresh">
          <Link to ="/">Refresh</Link>
        </Button>
      </ErrorContainer>
    </div>
  );
};

export default NotFound;
