import React from 'react'
import FeedListItem from './FeedListItem'
import PropTypes from 'prop-types'

const FeedList = (props) => {
  const { items, faves } = props
  console.log('feedlist incoming items and faves', items, faves)
  if (!items || items.length === 0) {
    return (
      <div className="progress">
        <div
          className="progress-bar progress-bar-striped progress-bar-animated"
          role="progressbar"
          aria-valuenow="75"
          aria-valuemin="0"
          aria-valuemax="100"
        ></div>
      </div>
    )
  }
  return (
    <div className="accordion" id="feedaccordian">
      <ul className="list-unstyled">
        {items.map((item, idx) => {
          const itemID = item.querySelector('guid').innerHTML
          return (
            <FeedListItem
              key={idx}
              id={`${idx}`}
              isFave={faves.has(itemID)}
              item={item}
              {...props}
            />
          )
        })}
      </ul>
    </div>
  )
}

FeedList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.instanceOf(Element)),
  faves: PropTypes.instanceOf(Map),
}
export default FeedList
