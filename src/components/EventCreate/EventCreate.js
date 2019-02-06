import React from 'react'
import Header from '../Common/Header/Header'
import Card from "../Common/Card/Card"
import FormContainer from "../Common/FormContainer/FormContainer"
import EventForm from "../EventForm/EventForm"
import {inject, observer} from "mobx-react"

@inject('eventStore')
@observer
class EventCreate extends React.Component {

  render() {
    return  (
      <div>
        <Header page="create_event"/>

        <Card>
          <FormContainer
            title="Create new event"
            subtitle="Enter details below."
            errorMsg={this.props.eventStore.errorMsg}>

            <EventForm />

          </FormContainer>

        </Card>

      </div>
    )
  }
}

export default EventCreate