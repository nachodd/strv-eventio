import React from 'react'
import Header from '../../components/Common/Header/Header'
import Card from "../../components/Common/Card/Card"
import FormContainer from "../../components/Common/FormContainer/FormContainer"
import EventForm from "../../components/EventForm/EventForm"
import {inject, observer} from "mobx-react"
import './EventCreate.scss'

@inject('eventStore')
@observer
class EventCreate extends React.Component {

  render() {
    return  (
      <div>
        <Header page="create_event"/>

        <div className="create-event">
          <FormContainer
            title="Create new event"
            subtitle="Enter details below."
            errorMsg={this.props.eventStore.errorMsg}>

            <Card>
              <EventForm />
            </Card>

          </FormContainer>
        </div>


      </div>
    )
  }
}

export default EventCreate