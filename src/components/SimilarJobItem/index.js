import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobItem = props => {
  const {jobObj} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    rating,
    title,
  } = jobObj

  console.log(rating)

  return (
    <Link to={`/jobs/${id}`} className="link-item">
      <li className="similar-job-item">
        <div className="similar-job-item-profile-box">
          <img
            className="similar-jobs-item-company-logo"
            alt="similar job company logo"
            src={companyLogoUrl}
          />
          <div className="similar-job-item-role-rating-box">
            <h4 className="similar-job-item-role">{title}</h4>
            <p className="similar-job-item-rating">
              <FaStar color="#fbbf24" />
              {rating}
            </p>
          </div>
        </div>
        <h5 className="similar-job-item-desc-heading">Description</h5>
        <p className="similar-job-item-desc">{jobDescription}</p>
        <div className="similar-job-item-info-box">
          <div className="similar-job-item-info-item">
            <MdLocationOn className="similar-job-item-location-icon" />
            <p className="similar-job-item-location">{location}</p>
            <BsBriefcaseFill className="similar-job-item-case-icon" />
            <p className="similar-job-item-type">{employmentType}</p>
          </div>
        </div>
      </li>
    </Link>
  )
}

export default SimilarJobItem
