import { observable, action, computed, toJS } from 'mobx';
import api from '../api';

class EventsStore {
  // @observable isInsideEvent = false;
  @observable isLoadingEvents = false;
  @observable events = [];
  @observable eventsToDisplay = "all"
  @observable eventsViewMode = "grid"

  @computed get eventFilterClasses() {
    const classes = { all: "", future: "", past: ""}
    switch (this.eventsToDisplay) {
      case "future": return { ...classes, future: "selected" }
      case "past": return { ...classes, past: "selected" }
      case "all":
      default:
        return { ...classes, all: "selected" }
    }
  }
  @computed get eventsViewModeFillColor() {
    switch (this.eventsViewMode) {
      case "list": return { grid: { fill:"#D9DCE1" }, list: { fill:"#323C46" }}
      case "grid":
      default:
        return { grid: { fill:"#323C46" }, list: { fill:"#D9DCE1" }}

    }
  }
  @computed get eventsFiltered() {
    const events = toJS(this.events);
    const now = new Date();
    switch (this.eventsToDisplay) {
      case "future":
        return events.filter(e => now < new Date(e.startsAt))
      case "past":
        return events.filter(e => now > new Date(e.startsAt))
      case "all":
      default:
        return events
    }
  }


  @action loadEvents() {
    this.isLoadingEvents = true;
    return api.Events.getAll()
      .then(action((events) => { this.events = events }))
      .finally(action(() => { this.isLoadingEvents = false; }))
  }
  @action assistEvent(eventId) {
    debugger
    return api.Events.assist(eventId)
      .then(action((event) => {
        debugger
        const ev = this.events.find(e => e.id === eventId)
        ev.attendees = event
      }))
      .finally(action(() => { this.isLoadingEvents = false; }))
  }

  @action setEvents(events) {
    this.events = events;
  }
  @action setEventsToDisplay(eventsToDisplay="all") {
    this.eventsToDisplay = eventsToDisplay
  }
  @action setEventsViewMode(eventsViewMode) {
    this.eventsViewMode = eventsViewMode
  }
  // @action setIsInsideEvent(isInsideEvent) {
  //   this.isInsideEvent = isInsideEvent;
  // }

}

export default new EventsStore();
