import React from 'react'
import { Link } from 'react-router-dom'
import SidePanel from "@comp/Common/SidePanel/SidePanel"
import TrooperBackground from "@comp/Common/TrooperBackground/TrooperBackground"
import FormContainer from "@comp/Common/FormContainer/FormContainer"
import Button from "@comp/Common/Button/Button"
import Header from '@comp/Common/Header/Header'
import Content from "@comp/Common/Content/Content"

const NotFound = () => {

  return (
    <div className="notfound_container">
      <Header page="not_found"/>
      {/*<Logo/>*/}
      {/*<HeadSingUpIn type="singIn"/>*/}
      <TrooperBackground/>
      <SidePanel/>

      <Content>
        <FormContainer>
          <div className="title">404 Error - page not found</div>
          <div className="content">
            Seems like Darth Vader just hits our website and drops it down.
            <br />
            Please press the refresh button and everything should be fine again.
          </div>
          <Button color="darkTeal">
            <Link to ="/">Refresh</Link>
          </Button>
        </FormContainer>
      </Content>


    </div>
  );
};

export default NotFound;
