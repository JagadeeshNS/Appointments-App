// Write your code here
// Write your code here
const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }

  return (
    <li>
      <div>
        <div>
          <p>{title}</p>
          <p>{date}</p>
        </div>
        <button
          className="button"
          type="button"
          onClick={onClickStar}
          data-testid="star"
        >
          <img src={starImageUrl} alt="star" />
        </button>
      </div>
    </li>
  )
}

export default AppointmentItem
