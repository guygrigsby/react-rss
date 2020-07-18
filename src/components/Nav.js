import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ title, feeds, setFeeds, menuItems }) => {
  const [url, setURL] = React.useState('')

  const handleChange = (e) => {
    const url = e.target.value
    console.log('update URL', url)
    setURL(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const copy = [...feeds]
    copy.push(url)
    console.log('copy', copy)
    setFeeds(copy)
    console.log('setting URL', url)
  }
  console.log('feeds in nav', feeds)

  return (
    <nav className="navbar nav-tabs">
      <div>
        <span className="navbar-text">{title}</span>
      </div>
      {menuItems.map((item, idx) => (
        <Link className="nav-item button m-2" key={idx} to={item.link}>
          {item.icon} {item.name}
        </Link>
      ))}

      <form className="form-inline" onSubmit={handleSubmit}>
        <input
          className="form-control mr-sm-2"
          type="url"
          value={url}
          onChange={handleChange}
        />
        <button className="btn btn-outline-success my-2 my-sm-0">
          Add Feed
        </button>
      </form>
    </nav>
  )
}

Navbar.propTypes = {
  title: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.any),
  feeds: PropTypes.arrayOf(PropTypes.string),
  setFeeds: PropTypes.func,
  submitFeed: PropTypes.func,
}

export default Navbar
