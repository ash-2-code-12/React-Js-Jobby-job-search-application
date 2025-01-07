import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import Header from '../Header'
import SimilarJobItem from '../SimilarJobItem'
import SkillItem from '../SkillItem'

import './index.css'

const apiStatusValues = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class JobDetailsPage extends Component {
  state = {
    jobApiStatus: apiStatusValues.initial,
    jobDetailsObj: null,
    similarJobsList: [],
  }

  componentDidMount() {
    this.fetchJobDetails()
  }

  componentDidUpdate(prevProps) {
    const {
      match: {
        params: {id: prevId},
      },
    } = prevProps
    const {
      match: {
        params: {id: currentId},
      },
    } = this.props

    // Check if the `id` parameter in the URL has changed
    if (prevId !== currentId) {
      this.fetchJobDetails()
    }
  }

  formatSimilarJobObj = jobObj => ({
    companyLogoUrl: jobObj.company_logo_url,
    employmentType: jobObj.employment_type,
    id: jobObj.id,
    jobDescription: jobObj.job_description,
    location: jobObj.location,
    rating: jobObj.rating,
    title: jobObj.title,
  })

  formatSkillObj = skillObj => ({
    name: skillObj.name,
    imageUrl: skillObj.image_url,
  })

  formatLifeAtCompObj = lacObj => ({
    description: lacObj.description,
    imageUrl: lacObj.image_url,
  })

  formatJobDetails = jobObj => ({
    companyLogoUrl: jobObj.company_logo_url,
    companyWebsiteUrl: jobObj.company_website_url,
    employmentType: jobObj.employment_type,
    id: jobObj.id,
    jobDescription: jobObj.job_description,
    lifeAtCompany: this.formatLifeAtCompObj(jobObj.life_at_company),
    location: jobObj.location,
    rating: jobObj.rating,
    title: jobObj.title,
    skills: jobObj.skills.map(each => this.formatSkillObj(each)),
    packagePerAnnum: jobObj.package_per_annum,
  })

  processJobDetailsApiResponse = data => {
    const formattedSimilarJobs = data.similar_jobs.map(each =>
      this.formatSimilarJobObj(each),
    )
    const formattedJobDetailsObj = this.formatJobDetails(data.job_details)

    this.setState({
      jobDetailsObj: formattedJobDetailsObj,
      similarJobsList: formattedSimilarJobs,
      jobApiStatus: apiStatusValues.success,
    })
  }

  fetchJobDetails = async () => {
    this.setState({jobApiStatus: apiStatusValues.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
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
        this.processJobDetailsApiResponse(data)
      } else {
        const errorMsg = data.error_msg
        console.error(`Error fetching Job Details : ${errorMsg}`)
        this.setState({
          jobApiStatus: apiStatusValues.failed,
          similarJobsList: [],
          jobDetailsObj: null,
        })
      }
    } catch (error) {
      console.error(`An error happened while fetching job details: ${error}`)
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="60" width="60" />
    </div>
  )

  renderFailedView = () => (
    <div className="job-details-failed-view">
      <img
        className="job-details-failed-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h3 className="job-details-failed-heading">Oops! Something Went Wrong</h3>
      <p className="job-details-failed-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={this.fetchJobDetails}
        className="retry-job-details-fetch-btn"
        type="button"
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsSection = () => {
    const {jobDetailsObj} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetailsObj

    const {description, imageUrl} = lifeAtCompany
    console.log(`job : ${jobDetailsObj.title}`)

    return (
      <>
        <div className="job-details-profile-box">
          <img
            className="jobs-details-company-logo"
            alt="job details company logo"
            src={companyLogoUrl}
          />
          <div className="job-details-role-rating-box">
            <h4 className="job-details-role">{title}</h4>
            <p className="job-details-rating">
              <FaStar color="#fbbf24" />
              {rating}
            </p>
          </div>
        </div>
        <div className="job-details-info-box">
          <div className="job-details-info-item">
            <MdLocationOn className="job-details-location-icon" />
            <p className="job-details-location">{location}</p>
            <BsBriefcaseFill className="job-details-case-icon" />
            <p className="job-details-type">{employmentType}</p>
          </div>
          <p className="job-details-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-details-rule" />
        <div className="job-details-link-desc-head-container">
          <h5 className="job-details-desc-heading">Description</h5>
          <a href={companyWebsiteUrl} className="job-details-job-from-link">
            Visit <FaExternalLinkAlt size="12" />
          </a>
        </div>
        <p className="job-details-desc">{jobDescription}</p>

        <div className="skills-container">
          <h5 className="job-details-skills-heading">Skills</h5>
          <ul className="job-details-skills-list">
            {skills.map(skillObj => (
              <SkillItem key={skillObj.name} skillObj={skillObj} />
            ))}
          </ul>
        </div>

        <div className="life-at-comp-section">
          <div className="lac-text-container">
            <h5 className="lac-heading">Life at Company</h5>
            <p className="lac-desc">{description}</p>
          </div>
          <img className="lac-img" src={imageUrl} alt="life at company" />
        </div>
      </>
    )
  }

  renderSimilarJobsSection = () => {
    const {similarJobsList} = this.state
    return (
      <>
        <h2 className="similar-jobs-heading">Similar Jobs</h2>
        <ul className="job-details-similar-jobs-list">
          {similarJobsList.map(jobObj => (
            <SimilarJobItem key={jobObj.id} jobObj={jobObj} />
          ))}
        </ul>
      </>
    )
  }

  renderSuccessView = () => (
    <div className="job-details-success-view">
      <div className="job-details-section">
        {this.renderJobDetailsSection()}
      </div>
      <div className="job-details-similar-jobs-section">
        {this.renderSimilarJobsSection()}
      </div>
    </div>
  )

  renderJobDetailsPage = () => {
    const {jobApiStatus} = this.state

    switch (jobApiStatus) {
      case apiStatusValues.inProgress:
        return this.renderLoadingView()
      case apiStatusValues.failed:
        return this.renderFailedView()
      case apiStatusValues.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-page">{this.renderJobDetailsPage()}</div>
      </>
    )
  }
}

export default JobDetailsPage
