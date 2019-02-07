import React from 'react'
import {inject, observer} from "mobx-react"
import {withRouter} from "react-router-dom"
import Header from "../../components/Common/Header/Header"
import './Events.scss'
import Loading from "@comp/Common/Loading/Loading"
import EventsHeader from '@comp/EventsHeader/EventsHeader'
import EventItemList from '@comp/EventListItem/EventListItem'
import FloatingButton from "@comp/Common/FloatingButton/FloatingButton"


@inject('eventStore', 'userStore')
@withRouter
@observer
class Events extends React.Component {

  componentWillMount() {
    document.body.classList.add('gray');
    document.body.classList.remove('white');
  }

  componentDidMount() {
    this.props.eventStore.setEventFloatingButtonType('add')
    this.props.eventStore.loadEvents()
  }

  floatingButtonAction = () => {
    this.props.history.push('create-event')
  }

  render() {
    const {isLoadingEvents, eventsFiltered, eventsViewMode, eventFloatingButtonType} = this.props.eventStore
    const {currentUser}= this.props.userStore

    let rowClasses = ['cardsContainer']
    if (eventsViewMode==="grid") {
      rowClasses.push('gridStyle')
    } else {
      rowClasses.push('tableStyle')
    }

    // debugger
    return (
      <div className="eventList">
        <Header />

        <div className="eventsContainer">
          { isLoadingEvents ?
            <div className="eventsLoadingContainer">
              <Loading color="gray"/>
            </div>
            :
            (
              <div>
                <EventsHeader />
                <div className={rowClasses.join(' ')}>
                  {
                    eventsFiltered.map(eventItem => {
                      const isOwner = eventItem.owner.id === currentUser.id
                      const isAttending = eventItem.attendees.some(at => at.id === currentUser.id)
                      let buttonType
                      if (isOwner) {
                        buttonType = 'owner'
                      }
                      else {
                        buttonType = isAttending ? 'attending' : 'notAttending'
                      }
                      return (
                        <EventItemList
                          key={eventItem.id}
                          eventItem={eventItem}
                          viewMode={eventsViewMode}
                          buttonType={buttonType}/>
                      )
                    })
                  }
                </div>
                <FloatingButton type={eventFloatingButtonType} onClick={this.floatingButtonAction} />

              </div>
            )
          }
        </div>


      </div>
    )
  }

}


export default Events;