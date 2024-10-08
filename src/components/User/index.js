import './index.css'

const User = props => {
  const {eachUser, isChecked, deleteUser} = props
  const {id, website, username, password} = eachUser
  const inital = username[0]
  const onClickDelete = () => {
    deleteUser(id)
  }
  return (
    <li className="user-item">
      <div className="inner-container">
        <div className="inital">{inital}</div>
        <div className="text-container">
          <p className="username">{username}</p>
          <p className="websiteUrl">{website}</p>
          {isChecked && <p className="password">{password}</p>}
          {!isChecked && (
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
              className="starts-img"
              alt="stars"
            />
          )}
        </div>
      </div>
      <button
        className="delete-button"
        data-testid="delete"
        onClick={onClickDelete}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="delete-icon"
        />
      </button>
    </li>
  )
}

export default User
