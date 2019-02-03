import React from 'react'
import {observer, inject} from 'mobx-react'
import './EventsHeader.scss'

@inject('eventStore')
@observer
class EventsHeader extends React.Component {

  changeEventsToDisplay(filter) {
    this.props.eventStore.setEventsToDisplay(filter)
  }
  changeEventViewMode(mode) {
    this.props.eventStore.setEventsViewMode(mode)
  }

  render() {
    const {eventFilterClasses, eventsViewModeFillColor} = this.props.eventStore

    return (
      <div className="eventsHeader">
        <div className="eventsFilter">
          <span onClick={() => this.changeEventsToDisplay('all')} className={eventFilterClasses.all}>ALL EVENTS</span>
          <span onClick={() => this.changeEventsToDisplay('future')} className={eventFilterClasses.future}>FUTURE EVENTS</span>
          <span onClick={() => this.changeEventsToDisplay('past')} className={eventFilterClasses.past}>PAST EVENTS</span>
        </div>

        <div className="eventsListType">
          <span onClick={() => this.changeEventViewMode('grid')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H24V24H0V0Z" stroke="black" strokeOpacity="0.01" strokeWidth="0"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M4 11H9V5H4V11ZM4 18H9V12H4V18ZM10 18H15V12H10V18ZM16 18H21V12H16V18ZM10 11H15V5H10V11ZM16 5V11H21V5H16Z" {...eventsViewModeFillColor.grid}/>
            </svg>
          </span>
          <span onClick={() => this.changeEventViewMode('list')}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M0 0H24V24H0V0Z" stroke="black" strokeOpacity="0.01" strokeWidth="0"/>
              <path fillRule="evenodd" clipRule="evenodd" d="M4 18H21V12H4V18ZM4 5V11H21V5H4Z" {...eventsViewModeFillColor.list}/>
            </svg>
          </span>
        </div>

      </div>
    )
  }
}


export default EventsHeader