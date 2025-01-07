import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

const apiStatusValues = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class UserProfileCard extends Component {
  state = {
    userDetails: null,
    userDetailsApiStatus: apiStatusValues.initial,
  }

  componentDidMount() {
    this.fetchUserDetails()
  }

  fetchUserDetails = async () => {
    this.setState({userDetailsApiStatus: apiStatusValues.inProgress})
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookies.get('jwt_token')
    console.log(jwtToken)

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    try {
      const response = await fetch(url, options)
      const data = await response.json()
      if (response.ok) {
        const profileDetails = data.profile_details
        const fetchedUserDetails = {
          profileImageUrl: profileDetails.profile_image_url,
          name: profileDetails.name,
          shortBio: profileDetails.short_bio,
        }
        console.log(fetchedUserDetails)
        this.setState({
          userDetailsApiStatus: apiStatusValues.success,
          userDetails: fetchedUserDetails,
        })
      } else {
        console.error('An error occurred while fetching user details')
        this.setState({
          userDetails: null,
          userDetailsApiStatus: apiStatusValues.failed,
        })
      }
    } catch (error) {
      console.error('An error occurred while fetching user details:', error)
    }
  }

  userProfileLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  userProfileFailureView = () => (
    <button
      onClick={this.fetchUserDetails}
      className="retry-userdetails-fetch-btn"
      type="button"
    >
      Retry
    </button>
  )

  userProfileSuccessView = () => {
    const {userDetails} = this.state
    const {name, shortBio, profileImageUrl} = userDetails

    return (
      <div className="user-profile-card">
        <img className="user-profile-img" src={profileImageUrl} alt="profile" />
        <h3 className="user-profile-name">{name}</h3>
        <p className="user-profile-bio">{shortBio}</p>
      </div>
    )
  }

  render() {
    const {userDetailsApiStatus} = this.state

    switch (userDetailsApiStatus) {
      case apiStatusValues.inProgress:
        return this.userProfileLoadingView()
      case apiStatusValues.failed:
        return this.userProfileFailureView()
      case apiStatusValues.success:
        return this.userProfileSuccessView()
      default:
        return null
    }
  }
}
export default UserProfileCard
