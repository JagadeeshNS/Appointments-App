// Write your code here
import {Component} from 'react'

import {format} from 'date-fns'

import {v4} from 'uuid'
import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    AppointmentsList: [],
    isFavorite: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      AppointmentsList: prevState.AppointmentsList.map(eachList => {
        if (id === eachList.id) {
          return {...eachList, isStarred: !eachList.isStarred}
        }
        return eachList
      }),
    }))
  }

  onClickFilter = () => {
    const {isFavorite} = this.state
    this.setState({
      isFavorite: !isFavorite,
    })
  }

  renderAppointmentsList = FilteredAppointmentsList =>
    FilteredAppointmentsList.map(eachList => (
      <AppointmentItem
        key={eachList.id}
        appointmentDetails={eachList}
        toggleIsStarred={this.toggleIsStarred}
      />
    ))

  onAdd = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formatDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formatDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      AppointmentsList: [...prevState.AppointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeTitleInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDateInput = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  getFilteredAppointmentsList = () => {
    const {isFavorite, AppointmentsList} = this.state
    if (isFavorite) {
      return AppointmentsList.filter(eachList => eachList.isStarred === true)
    }
    return AppointmentsList
  }

  render() {
    const {titleInput, dateInput} = this.state
    const FilteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="">
        <div className="">
          <h1>Add Appointment</h1>
          <div>
            <form className="" onSubmit={this.onAdd}>
              <label className="" htmlFor="title">
                TITLE
              </label>

              <input
                type="text"
                id="title"
                className=""
                placeholder="TITLE"
                value={titleInput}
                onChange={this.onChangeTitleInput}
              />

              <label className="" htmlFor="date">
                DATE
              </label>

              <input
                type="date"
                id="date"
                className=""
                value={dateInput}
                onChange={this.onChangeDateInput}
              />

              <button type="submit" className="add-button">
                Add
              </button>
            </form>

            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className=""
            />
          </div>

          <hr />

          <div>
            <div>
              <h1>Appointments</h1>
              <button type="button" onClick={this.onClickFilter}>
                starred
              </button>
            </div>
            <ul className="">
              {this.renderAppointmentsList(FilteredAppointmentsList)}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
