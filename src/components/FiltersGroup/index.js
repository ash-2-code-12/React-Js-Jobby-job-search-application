const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const {
    selectedEmploymentTypes,
    selectedMinimumSalary,
    handleEmploymentTypeChange,
    handleSalaryRangeChange,
  } = props
  const renderEmploymentTypesFilter = () =>
    employmentTypesList.map(empObj => (
      <li key={empObj.employmentTypeId}>
        <input
          type="checkbox"
          checked={selectedEmploymentTypes.includes(empObj.employmentTypeId)}
          value={empObj.employmentTypeId}
          id={empObj.employmentTypeId}
          onChange={handleEmploymentTypeChange}
        />
        <label htmlFor={empObj.employmentTypeId}>{empObj.label}</label>
      </li>
    ))

  const renderSalaryRangesFilter = () =>
    salaryRangesList.map(salaryObj => (
      <li key={salaryObj.salaryRangeId}>
        <input
          type="radio"
          name="salaryRange"
          value={salaryObj.salaryRangeId}
          id={salaryObj.salaryRangeId}
          checked={selectedMinimumSalary === salaryObj.salaryRangeId}
          onChange={handleSalaryRangeChange}
        />
        <label htmlFor={salaryObj.salaryRangeId}>{salaryObj.label}</label>
      </li>
    ))

  return (
    <div className="filters-container">
      <hr className="filters-separator" />
      <div className="filter-group-container">
        <h3 className="filter-group-heading">Type of Employment</h3>
        <ul className="filter-group-list">{renderEmploymentTypesFilter()}</ul>
      </div>
      <hr className="filters-separator" />
      <div className="filter-group-container">
        <h3 className="filter-group-heading">Salary Range</h3>
        <ul className="filter-group-list">{renderSalaryRangesFilter()}</ul>
      </div>
    </div>
  )
}

export default FiltersGroup
