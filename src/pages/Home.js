import React from 'react';
import PropTypes from 'prop-types';
import FeedList from '../components/FeedList';

const Home = ({ feedURL }) => {
  return (
    <div className="container-fluid m-2 p-2">
      <div className="row">
        <div className="col">{<FeedList feedURL={feedURL} />}</div>
      </div>
    </div>
  );
};

Home.propTypes = {
  feedURL: PropTypes.string,
  feedContents: PropTypes.instanceOf(XMLDocument),
  setFeedContents: PropTypes.func,
};
export default Home;
