import React from 'react'
import './EventItemList.scss'
import Card from '../Common/Card/Card'
import Button from '../Common/Button/Button'
import moment from 'moment'
import {inject} from "mobx-react"

/*(observer((props) => {
  // ...
}));*/
const EventItemList = inject("eventStore")(({eventItem, viewMode, buttonType, eventStore}) => {

  const eventDate =
    moment(new Date(eventItem.startsAt))
    .format('MMMM DD, YYYY - h:mm A')

  let button
  switch (buttonType) {
    case "owner":
      button = <Button size="small">EDIT</Button>
      break
    case "attending":
      button = (
        <Button size="small" color="red"
                onClick={() => eventStore.updateEventAttendees('leave', eventItem.id)}
                loadingState={eventItem.isProcessing}>
          LEAVE
        </Button>
      )
      break
    case "notAttending":
      button = (
        <Button size="small" color="green"
                onClick={() => eventStore.updateEventAttendees('join', eventItem.id)}
                loadingState={eventItem.isProcessing}>
          JOIN
        </Button>
      )
      break
  }

  return viewMode === "grid" ? (
    <Card className="card">
      <div className="cardContent">
        <div className="date">{eventDate}</div>
        <div className="title">{eventItem.title}</div>
        <div className="owner">{eventItem.owner.firstName} {eventItem.owner.lastName}</div>
        <div className="description">{eventItem.description}</div>
      </div>
      <div className="cardFooter">
        <div className="cardFooterCont">

          <div className="attendeeCont">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H24V24H0V0Z" stroke="black" strokeOpacity="0.01" strokeWidth="0"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#949EA8"/>
            </svg>
            <div>
              {eventItem.attendees.length} of {eventItem.capacity}
            </div>
          </div>
          <div className="buttonCont">
            { button }
          </div>
        </div>
      </div>
    </Card>
    ) : (
    <Card className="card">
      <div className="cardContent">
        <div className="title">{eventItem.title}</div>
        <div className="description">{eventItem.description}</div>
        <div className="owner">{eventItem.owner.firstName} {eventItem.owner.lastName}</div>
        <div className="date">{eventDate}</div>
        <div className="attendeeCont">
          <div>
            {eventItem.attendees.length} of {eventItem.capacity}
          </div>
        </div>
        <div className="buttonCont">
          { button }
        </div>

      </div>
    </Card>
  )
})

export default EventItemList
