import {Component} from 'react'
import {IoMdSearch} from 'react-icons/io'
import Cookies from 'js-cookie'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import FiltersGroup from '../FiltersGroup'
import UserProfileCard from '../UserProfileCard'
import JobsListSection from '../JobsListSection'

import './index.css'

const apiStatusValues = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class JobsPage extends Component {
  state = {
    searchInputValue: '',
    selectedEmploymentTypes: [],
    selectedMinimumSalary: '',
    jobsApiStatus: apiStatusValues.initial,
    jobsList: [],
  }

  componentDidMount() {
    this.fetchJobsList()
  }

  formatJobObj = jobObj => ({
    title: jobObj.title,
    rating: jobObj.rating,
    location: jobObj.location,
    id: jobObj.id,
    jobDescription: jobObj.job_description,
    employmentType: jobObj.employment_type,
    companyLogoUrl: jobObj.company_logo_url,
    packagePerAnnum: jobObj.package_per_annum,
  })

  fetchJobsList = async () => {
    this.setState({jobsApiStatus: apiStatusValues.inProgress})
    // prettier-ignore
    const {searchInputValue, selectedEmploymentTypes, selectedMinimumSalary} = this.state
    const empTypesString = selectedEmploymentTypes.join(',')
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs?employment_type=${empTypesString}&minimum_package=${selectedMinimumSalary}&search=${searchInputValue}`
    console.log(url)
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
        const {jobs} = data
        console.log(`total :${jobs.length}`)
        const formattedJobsList = jobs.map(each => this.formatJobObj(each))
        console.log(formattedJobsList[0])
        this.setState({
          jobsApiStatus: apiStatusValues.success,
          jobsList: formattedJobsList,
        })
      } else {
        console.error('An error occurred while fetching user details')
        this.setState({jobsApiStatus: apiStatusValues.failed})
      }
    } catch (error) {
      console.error('An error occurred while fetching user details:', error)
    }
  }

  // ---------- start of searchbar section -------------
  onSearchInputChange = event =>
    this.setState({searchInputValue: event.target.value})

  onSearchSubmit = () => this.fetchJobsList()

  renderSearchBar = () => {
    const {searchInputValue} = this.state

    return (
      <div className="search-box">
        <input
          value={searchInputValue}
          onChange={this.onSearchInputChange}
          type="search"
          className="search-bar"
          placeholder="Search"
        />
        <button
          onClick={this.onSearchSubmit}
          type="button"
          className="search-btn"
          data-testid="searchButton"
        >
          <IoMdSearch className="search-icon" size="21" color="white" />
        </button>
      </div>
    )
  }
  // ----------- end of searchbar section ------------

  // ----- start of filters section ----------
  onEmploymentTypeChange = event => {
    const {checked, value} = event.target

    this.setState(prevState => {
      if (checked) {
        return {
          selectedEmploymentTypes: [
            ...prevState.selectedEmploymentTypes,
            value,
          ],
        }
      }
      return {
        selectedEmploymentTypes: prevState.selectedEmploymentTypes.filter(
          empId => empId !== value,
        ),
      }
    }, this.fetchJobsList)
  }

  onMinimumSalaryChange = event =>
    this.setState(
      {selectedMinimumSalary: event.target.value},
      this.fetchJobsList,
    )

  renderFiltersSection = () => {
    const {selectedEmploymentTypes, selectedMinimumSalary} = this.state
    console.log(selectedEmploymentTypes)
    console.log(selectedMinimumSalary)

    return (
      <>
        <div className="small-device-search-bar">{this.renderSearchBar()}</div>
        <div className="user-profile-section">
          <UserProfileCard />
        </div>
        <div className="filters-list-group">
          <FiltersGroup
            selectedEmploymentTypes={selectedEmploymentTypes}
            selectedMinimumSalary={selectedMinimumSalary}
            handleEmploymentTypeChange={this.onEmploymentTypeChange}
            handleSalaryRangeChange={this.onMinimumSalaryChange}
          />
        </div>
      </>
    )
  }

  // ----- end of filters section ----------

  // ----- start jobs list section ----------
  renderJobsListSection = () => {
    const {jobsList, jobsApiStatus} = this.state

    return (
      <>
        <div className="large-device-search-bar">{this.renderSearchBar()}</div>
        <JobsListSection
          apiStatusValues={apiStatusValues}
          jobsList={jobsList}
          jobsApiStatus={jobsApiStatus}
          fetchJobsList={this.fetchJobsList}
        />
      </>
    )
  }
  // ----- end of jobs list section ---------

  render() {
    return (
      <>
        <Header />
        <div className="jobs-page">
          <div className="filters-section">{this.renderFiltersSection()}</div>
          <div className="jobs-list-section">
            {this.renderJobsListSection()}
          </div>
        </div>
      </>
    )
  }
}

export default JobsPage
