import {Component} from 'react'
import User from '../User'
import './index.css'
import {v4 as uuidv4} from 'uuid'

class Manager extends Component {
  state = {
    userPasswordList: [],
    searchInput: '',
    username: '',
    password: '',
    website: '',
    isChecked: false,
  }

  onChangeWebsite = event => {
    this.setState({website: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  isShowPassword = () => {
    const {isChecked} = this.state
    if (isChecked) {
      this.setState({isChecked: false})
    } else {
      this.setState({isChecked: true})
    }
  }

  addNewUser = event => {
    event.preventDefault()
    const {website, username, password} = this.state
    const newUser = {
      id: uuidv4(),
      website,
      username,
      password,
    }
    this.setState(prevState => ({
      userPasswordList: [...prevState.userPasswordList, newUser],
    }))
    this.setState({website: '', password: '', username: ''})
  }

  deleteUser = id => {
    const {userPasswordList, count} = this.state
    const newFillteredList = userPasswordList.filter(
      eachUser => eachUser.id !== id,
    )
    this.setState({userPasswordList: newFillteredList})
  }

  render() {
    const {
      userPasswordList,
      searchInput,
      username,
      password,
      website,
      isChecked,
    } = this.state
    const fillteredList = userPasswordList.filter(eachUser =>
      eachUser.website.toLowerCase().includes(searchInput.toLowerCase()),
    )
    const countIt = fillteredList.length
    return (
      <div className="app-container">
        <div className="logo-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
            className="app-logo"
          />
        </div>
        <div className="add-password-container">
          <div className="input-new-password-container">
            <h1 className="add-password-heading ">Add New Password</h1>
            <form onSubmit={this.addNewUser}>
              <div className="input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="icon"
                />
                <input
                  placeholder="Enter Website"
                  type="text"
                  className="input-element"
                  onChange={this.onChangeWebsite}
                  value={website}
                />
              </div>
              <div className="input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="icon"
                />
                <input
                  placeholder=" Enter Username"
                  type="text"
                  className="input-element"
                  onChange={this.onChangeUsername}
                  value={username}
                />
              </div>
              <div className="input-card">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                  alt="password"
                  className="icon"
                />
                <input
                  placeholder="Enter Password"
                  type="password"
                  className="input-element"
                  value={password}
                  onChange={this.onChangePassword}
                />
              </div>
              <button type="submit" className="button">
                Add
              </button>
            </form>
          </div>
          <div className="img-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-img"
            />
          </div>
        </div>
        <div className="password-section">
          <div className="count-password-heading-container">
            <h1 className="password-count-heading">
              Your Passwords <p>{0 + countIt}</p>
            </h1>
            <div className="search-bar-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                placeholder="Search"
                type="search"
                className="password-search-bar"
                value={searchInput}
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="checkbox-container">
            <label className="checkbox-element">
              <input
                type="checkbox"
                checked={this.isChecked}
                onChange={this.isShowPassword}
              />
              Show Passwords
            </label>
          </div>
          <ul className="yours-passwords-container">
            {fillteredList.length === 0 && (
              <div className="no-passwords-container">
                <div className="no-passwords-container-inner">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                    alt="no passwords"
                    className="password-manager-img"
                  />
                  <p className="password-count-heading">No Passwords</p>
                </div>
              </div>
            )}

            {fillteredList.map(eachUser => (
              <User
                key={eachUser.id}
                eachUser={eachUser}
                isChecked={isChecked}
                deleteUser={this.deleteUser}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Manager
