import { observable, action, computed, toJS } from 'mobx';
import api from '../api';

class EventsStore {
  // @observable isInsideEvent = false;
  @observable isLoadingEvents = false;
  @observable events = [];
  @observable eventsToDisplay = "all"
  @observable eventsViewMode = "grid"
  @observable eventFloatingButtonType = 'add'
  @observable inProgress = false;
  @observable newEvent = {
    title: '',
    description: '',
    date: '',
    time: '',
    capacity: '',
  }
  @observable errorBag = {
    title: undefined,
    description: undefined,
    date: undefined,
    time: undefined,
    capacity: undefined,
  }
  @observable errorMsg = ''


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
      .then(action((events) => {
        this.events = events.map(e => {
          // add isProcessing flag for loading purposees
          e.isProcessing = false
          return e
        })
      }))
      .finally(action(() => { this.isLoadingEvents = false; }))
  }

  @action updateEventAttendees(action, eventId) {
    const eventToUpdate = this.events.find(e => e.id === eventId)
    eventToUpdate.isProcessing = true
    return api.Events[action](eventId)
      .then(this.updateAttendees)
      .finally(() => { eventToUpdate.isProcessing = false })
  }


  @action.bound
  updateAttendees(updateEvent) {
    const oldEvent = this.events.find(e => e.id === updateEvent.id)
    oldEvent.attendees = updateEvent.attendees
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
  @action setEventFloatingButtonType(eventFloatingButtonType) {
    this.eventFloatingButtonType = eventFloatingButtonType
  }
  // @action setIsInsideEvent(isInsideEvent) {
  //   this.isInsideEvent = isInsideEvent;
  // }

  @action setField(field, value) {
    this.newEvent[field] = value
  }
  @action resetForm() {
    this.newEvent.title = ''
    this.newEvent.description = ''
    this.newEvent.date = ''
    this.newEvent.time = ''
    this.newEvent.capacity = ''
    this.clearErrors()

  }
  @action
  clearErrors() {
    this.errorMsg = undefined
    this.errorBag.title = undefined
    this.errorBag.description = undefined
    this.errorBag.date = undefined
    this.errorBag.time = undefined
    this.errorBag.capacity = undefined
  }

  @action createEvent() {
    this.clearErrors()

    if (this.newEvent.date.trim() === "" || this.newEvent.time.trim() === "") {
      this.errorMsg = "Date & Time cannot be empty"
      this.errorBag.date = "Date & Time cannot be empty"
      this.errorBag.time = "Date & Time cannot be empty"
      return Promise.reject("Date & Time cannot be empty");
    }

    debugger


    const startsAt = new Date(`${this.newEvent.date} ${this.newEvent.time}`).toISOString();
    this.inProgress = true
    return api.Events.create(this.newEvent.title, this.newEvent.description, startsAt, this.newEvent.capacity)
      .catch(action((err) => {
        this.parseErrorMsg(err.response.body)
        throw err
      }))
      .finally(action(() => { this.inProgress = false }))
  }

  @action
  parseErrorMsg(reqBody) {
    if (reqBody.error) {
      switch (reqBody.error) {
        case "Validation":
          this.errorMsg = "There was some errors while processing your request"
          if (reqBody.errors) {
            if (Array.isArray(reqBody.errors)) {
              reqBody.errors.forEach((err) => {
                if (err.context.key && (err.context.key in this.errorBag)) {
                  this.errorBag[err.context.key] = err.message
                }
              })
            } else {
              // in register, the error comes as object like:
              // errors: { email: {..}, password: {...} }
              if (Object.keys(reqBody.errors).length) {
                const errorFields = Object.keys(reqBody.errors)
                errorFields.forEach((field) => {
                  if (field==='startsAt') {
                    this.errorBag.date = ""
                    this.errorBag.time = ""
                    this.errorMsg = "The date & time of the event must be in the future."
                  }
                  else if (field in this.errorBag) {
                    // if the kind of the error is min, put a custom message (as the original is ugly)
                    this.errorBag[field] =
                      reqBody.errors[field].kind === 'min'
                        ? `The capacity must be greater than 0`
                        : reqBody.errors[field].message
                  }
                })
              }
            }
          }
          break;
        default:
          this.errorMsg = "There was some errors while processing your request";
          break;
      }
    }
  }

}

export default new EventsStore();
