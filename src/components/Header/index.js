import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {MdHome} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const renderSmallDeviceHeaderContent = () => (
    <ul className="small-device-header-content">
      <li>
        <Link className="link-item" to="/">
          <MdHome className="header-icon" color="#f8fafc" size="30" />
        </Link>
      </li>
      <li>
        <Link className="link-item" to="/jobs">
          <BsBriefcaseFill className="header-icon" color="#f8fafc" size="26" />
        </Link>
      </li>
      <li>
        <button onClick={onLogout} type="button" className="logout-icon">
          <FiLogOut className="header-icon" color="#f8fafc" size="26" />
        </button>
      </li>
    </ul>
  )

  const renderLargeDeviceHeaderContent = () => (
    <>
      <ul className="large-device-header-content">
        <li>
          <Link className="link-item" to="/">
            <p className="header-text">Home</p>
          </Link>
        </li>
        <li>
          <Link className="link-item" to="/jobs">
            <p className="header-text">Jobs</p>
          </Link>
        </li>
      </ul>
      <button
        onClick={onLogout}
        type="button"
        className="large-device-header-content logout-btn"
      >
        Logout
      </button>
    </>
  )

  return (
    <div className="header">
      <Link to="/">
        <img
          className="header-logo"
          alt="website logo"
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
        />
      </Link>
      {renderSmallDeviceHeaderContent()}
      {renderLargeDeviceHeaderContent()}
    </div>
  )
}

export default withRouter(Header)
