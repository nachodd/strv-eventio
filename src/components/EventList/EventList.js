import React from 'react'
import {inject, observer} from "mobx-react"
import {withRouter} from "react-router-dom"
import Header from "../Common/Header/Header"
import './EventList.scss'
import Loading from "../Common/Loading/Loading"
import EventsHeader from '../EventsHeader/EventsHeader'
import EventItemList from '../EventItemList/EventItemList'



@inject('eventStore', 'userStore')
@withRouter
@observer
class EventList extends React.Component {

  componentWillMount() {
    document.body.classList.add('gray');
    document.body.classList.remove('white');
  }

  componentDidMount() {
    this.props.eventStore.loadEvents()
  }

  render() {
    const {isLoadingEvents, eventsFiltered, eventsViewMode} = this.props.eventStore
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

              </div>
            )
          }
        </div>


      </div>
    )
  }

}


export default EventList;