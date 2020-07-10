import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Navbar = ({ title, feedURL, setFeedURL, menuItems }) => {
  const [url, setURL] = React.useState(feedURL);

  const handleChange = (e) => {
    const url = e.target.value;
    console.log('update URL', url);
    setURL(url);
  };

  const handleSubmit = (e) => {
    setFeedURL(url);
    console.log('setting URL', url);
    e.preventDefault();
  };

  return (
    <nav className="navbar nav-tabs">
      <div>
        <i className="fas fa-rss m-2"></i>
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
          type="text"
          value={url}
          onChange={handleChange}
        />
        <button className="btn btn-outline-success my-2 my-sm-0">
          Get Feed
        </button>
      </form>
    </nav>
  );
};

Navbar.propTypes = {
  title: PropTypes.string,
  menuItems: PropTypes.arrayOf(PropTypes.any),
  feedURL: PropTypes.string,
  setFeedURL: PropTypes.func,
  submitFeed: PropTypes.func,
};

export default Navbar;
