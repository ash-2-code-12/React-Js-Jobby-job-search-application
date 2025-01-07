import {Link} from 'react-router-dom'

import Header from '../Header'
import './index.css'

const Home = props => {
  const onNavigateToJobPage = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-page">
        <h1 className="home-heading">Find The Job That Fits Your Life</h1>
        <p className="home-desc">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/jobs">
          <button
            onClick={onNavigateToJobPage}
            type="button"
            className="home-jobs-btn"
          >
            Find Jobs
          </button>
        </Link>
      </div>
    </>
  )
}
export default Home
