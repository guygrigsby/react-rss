import React from 'react'
import PropTypes from 'prop-types'
import Favorite from './Favorite.js'

const FeedHeader = (props) => {
  const { id, item, togglePane } = props
  const creator =
    item.getElementsByTagName('dc:creator').item(0) &&
    item.getElementsByTagName('dc:creator').item(0).childNodes[0].nodeValue
  console.log('item', item, 'creator', creator)
  return (
    <>
      <div className="d-flex" id={`heading${id}`}>
        <h5 className="mb-1">{item.querySelector('title').innerHTML}</h5>
        <div className="ml-auto">
          <Favorite {...props} />
        </div>
      </div>
      {creator ? (
        <>
          <small>by {creator}</small>
        </>
      ) : null}
      <br />
      <div className="d-flex" id={`heading${id}`}>
        <small>{item.querySelector('pubDate').innerHTML}</small>
        <span onClick={togglePane}>
          <i className="ml-auto fa fa-plus-square-o"></i>
        </span>
      </div>
    </>
  )
}

FeedHeader.propTypes = {
  id: PropTypes.string,
  togglePane: PropTypes.func,
  item: PropTypes.instanceOf(Element),
}
export default FeedHeader
