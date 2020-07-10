import React from 'react';
import PropTypes from 'prop-types';

const FeedListItem = ({ isActive, item, handleClick }) => {
  const active = isActive ? 'active' : '';
  const imgsrc =
    item.getElementsByTagName('media:content')[0] &&
    item.getElementsByTagName('media:content')[0].getAttribute('url');
  if (isActive) {
    console.log('rendering feed item', item);
    console.log('image url', imgsrc);
  }

  return (
    <>
      <li
        type="button"
        onClick={() => handleClick(item)}
        href={item.querySelector('link').innerHTML}
        className={`media list-group-item-action ${active}`}
      >
        <img className="mr-3" src={imgsrc} alt="placeholder" />
        <div className="media-body">
          <h5 className="mb-1">{item.querySelector('title').innerHTML}</h5>
          <small></small>
          <small>{item.querySelector('pubDate').innerHTML}</small>
          <p className="mb-1">{item.querySelector('description').innerHTML}</p>
        </div>
      </li>
    </>
  );
};

FeedListItem.propTypes = {
  isActive: PropTypes.bool,
  handleClick: PropTypes.func,
  item: PropTypes.instanceOf(Element),
};
export default FeedListItem;
