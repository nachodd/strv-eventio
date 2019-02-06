import React from 'react';
import Button from '../Common/Button/Button'
import Input from "../Common/Input/Input"
import LoginRegisterHOC from '../Common/LoginRegisterHoc/LoginRegisterHoc'
import './EventForm.scss'
import {inject, observer} from 'mobx-react'
import {withRouter} from "react-router-dom"


@inject('eventStore')
@withRouter
@observer
class EventForm extends React.Component {

  componentWillMount() {
  //  document.body.classList.remove('gray');
  //  document.body.classList.add('white');
  }

  componentWillUnmount() {
    this.props.eventStore.resetForm();
  }

  componentDidMount() {
  }

  handleInputChange = e => {
    this.props.eventStore.setField(e.target.name, e.target.value)
  }
  handleSubmitForm = (e) => {
    debugger
    e.preventDefault();
    this.props.eventStore.createEvent()
      .then(() => {
        this.props.history.push('/events')
      })
      .catch(e => console.log(e));
  };

  render() {
    const {newEvent, errorBag, inProgress} = this.props.eventStore

    return (
      <form className="EventForm" onSubmit={this.handleSubmitForm}>
        <Input label="Title" name="title"
               type="text"
               change={this.handleInputChange}
               value={newEvent.title}
               errorMsg={errorBag.title}/>
        <Input label="Description" name="description"
               type="text"
               change={this.handleInputChange}
               value={newEvent.description}
               errorMsg={errorBag.description}/>
        <Input label="Date" name="date"
               type="date"
               change={this.handleInputChange}
               value={newEvent.date}
               errorMsg={errorBag.date}/>
        <Input label="Time" name="time"
               type="time"
               change={this.handleInputChange}
               value={newEvent.time}
               errorMsg={errorBag.time}/>
        <Input label="Capacity" name="capacity"
               type="number"
               change={this.handleInputChange}
               value={newEvent.capacity}
               errorMsg={errorBag.capacity}/>

        <Button color="green" type="submit" loadingState={inProgress}>
          CREATE NEW EVENT
        </Button>
      </form>
    )
  }
}

export default EventForm