import './index.css'

const NotFound = () => (
  <div className="not-found-page">
    <img
      className="not-found-img"
      alt="not found"
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
    />
    <h4 className="not-found-head">Page Not Found</h4>
    <p className="not-found-desc">
      We are sorry, the page you requested could not be found
    </p>
  </div>
)

export default NotFound
