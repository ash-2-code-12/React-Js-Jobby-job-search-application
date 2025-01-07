import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import JobItem from '../JobItem'

import './index.css'

const JobsListSection = props => {
  const {jobsList, jobsApiStatus, apiStatusValues, fetchJobsList} = props

  const renderJobsLoadingView = () => (
    <div className="loader-container jobs-fetch-loader" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
    </div>
  )

  const renderJobsFailureView = () => (
    <div className="jobs-failure-view">
      <img
        className="jobs-failure-img"
        alt="failure view"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
      />
      <h1 className="jobs-failure-heading">OOPs! Something Went Wrong</h1>
      <p className="jobs-failure-desc">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        onClick={fetchJobsList}
        type="button"
        className="retry-jobs-failure-btn"
      >
        Retry
      </button>
    </div>
  )

  const renderNoJobsView = () => (
    <div className="jobs-failure-view">
      <img
        className="jobs-failure-img"
        alt="no jobs"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
      />
      <h1 className="jobs-failure-heading">No Jobs Found</h1>
      <p className="jobs-failure-desc">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  const renderJobsSuccessView = () => (
    <div className="jobs-success-view">
      <ul className="jobs-item-list">
        {jobsList.map(jobObj => (
          <JobItem key={jobObj.id} jobObj={jobObj} />
        ))}
      </ul>
    </div>
  )

  switch (jobsApiStatus) {
    case apiStatusValues.inProgress:
      return renderJobsLoadingView()
    case apiStatusValues.failed:
      return renderJobsFailureView()
    case apiStatusValues.success:
      if (jobsList.length === 0) {
        return renderNoJobsView()
      }
      return renderJobsSuccessView()
    default:
      return null
  }
}

export default JobsListSection
