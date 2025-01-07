import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errorMsg: '',
  }

  onSubmitSuccess = responseJwtToken => {
    this.setState({errorMsg: ''})
    Cookies.set('jwt_token', responseJwtToken, {expires: 30, path: '/'})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = responseErrorMsg => {
    this.setState({errorMsg: responseErrorMsg})
  }

  submitLoginForm = async event => {
    event.preventDefault()

    const {usernameInput, passwordInput} = this.state
    const loginDetails = {username: usernameInput, password: passwordInput}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(loginDetails),
    }

    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        this.onSubmitFailure(data.error_msg)
      }
    } catch (error) {
      console.error('An error occurred:', error)
    }
  }

  onChangeUsername = event => this.setState({usernameInput: event.target.value})

  renderUsernameField = () => {
    const {usernameInput} = this.state

    return (
      <>
        <label htmlFor="usernameField">USERNAME</label>
        <input
          id="usernameField"
          type="text"
          onChange={this.onChangeUsername}
          value={usernameInput}
          placeholder="Username"
        />
      </>
    )
  }

  onChangePassword = event => this.setState({passwordInput: event.target.value})

  renderPasswordField = () => {
    const {passwordInput} = this.state

    return (
      <>
        <label htmlFor="passwordField">PASSWORD</label>
        <input
          id="passwordField"
          type="password"
          onChange={this.onChangePassword}
          value={passwordInput}
          placeholder="Password"
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {errorMsg} = this.state

    return (
      <div className="login-page">
        <form onSubmit={this.submitLoginForm} className="login-card">
          <img
            className="login-site-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <div className="input-box">{this.renderUsernameField()}</div>
          <div className="input-box">{this.renderPasswordField()}</div>
          <button type="submit" className="login-btn">
            Login
          </button>
          {errorMsg !== '' && <p className="error-msg">*{errorMsg}</p>}
        </form>
        <p className="credentials"> valid credentials : rahul , rahul@2021</p>
      </div>
    )
  }
}

export default LoginForm
