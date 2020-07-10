import React from 'react';
import rss from '../services/rss.js';
import FeedListItem from './FeedListItem';
import PropTypes from 'prop-types';

const FeedList = ({ feedURL }) => {
  const [items, setItems] = React.useState();

  React.useEffect(() => {
    const getFeed = async () => {
      try {
        const items = await rss.fetchCurrent(feedURL);
        setItems(items);
      } catch (e) {
        console.log('caught exception', e, 'in Homepage');
      }
    };
    getFeed();
  }, [feedURL]);

  if (!items || items.length === 0) {
    return (
      <ul className="list-group">
        <li className="list-group-item">{"There's nothing here"}</li>
      </ul>
    );
  }
  return (
    <ul className="list-unstyled">
      {items.map((item, idx) => {
        return <FeedListItem key={idx} isActive={idx === 0} item={item} />;
      })}
    </ul>
  );
};

FeedList.propTypes = {
  //feedContents: PropTypes.instanceOf(XMLDocument),
  feedURL: PropTypes.string,
};
export default FeedList;
