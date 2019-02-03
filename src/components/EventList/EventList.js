import React from 'react'
import {inject, observer} from "mobx-react"
import {withRouter} from "react-router-dom"
import Header from "../Common/Header/Header"
import './EventList.scss'
import Loading from "../Common/Loading/Loading"
import EventsHeader from '../EventsHeader/EventsHeader'


@inject('eventStore')
@withRouter
@observer
class EventList extends React.Component {

  // componentWillMount() {
  //   this.props.eventStore.setEventsToDisplay()
  // }

  componentDidMount() {
    this.props.eventStore.loadEvents()
  }

  render() {
    const {isLoadingEvents, eventsFiltered} = this.props.eventStore

    console.log(eventsFiltered)

    return (
      <div className="eventList">
        <Header />

        <div className="eventsContainer">
          { isLoadingEvents ?
            <div className="eventsLoadingContainer">
              <Loading color="gray"/>
            </div>
            :
            <EventsHeader />
          }
        </div>


      </div>
    )
  }

}


export default EventList;