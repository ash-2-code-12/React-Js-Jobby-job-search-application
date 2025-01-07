import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobObj} = props
  const {
    title,
    rating,
    location,
    id,
    jobDescription,
    employmentType,
    companyLogoUrl,
    packagePerAnnum,
  } = jobObj

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="job-item">
        <div className="job-item-profile-box">
          <img
            className="jobs-item-company-logo"
            alt="company logo"
            src={companyLogoUrl}
          />
          <div className="job-item-role-rating-box">
            <h4 className="job-item-role">{title}</h4>
            <p className="job-item-rating">
              <FaStar color="#fbbf24" />
              {rating}
            </p>
          </div>
        </div>
        <div className="job-item-info-box">
          <div className="job-item-info-item">
            <MdLocationOn className="job-item-location-icon" />
            <p className="job-item-location">{location}</p>
            <BsBriefcaseFill className="job-item-case-icon" />
            <p className="job-item-type">{employmentType}</p>
          </div>
          <p className="job-item-package">{packagePerAnnum}</p>
        </div>
        <hr className="job-item-rule" />
        <h5 className="job-item-desc-heading">Description</h5>
        <p className="job-item-desc">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobItem
