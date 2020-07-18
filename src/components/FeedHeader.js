import React from 'react'
import PropTypes from 'prop-types'
import Favorite from './Favorite.js'

const FeedHeader = (props) => {
  const { id, item, togglePaneElement } = props

  const creator =
    item.getElementsByTagName('dc:creator').item(0) &&
    item.getElementsByTagName('dc:creator').item(0).childNodes[0].nodeValue

  return (
    <div className="d-flex flex-row" id={`heading${id}`}>
      <div className="m-2 p-2">{togglePaneElement}</div>
      <div className="d-flex flex-column w-100" id={`heading${id}`}>
        <div className="d-flex flex-row">
          <h5 className="ml-1">{item.querySelector('title').innerHTML}</h5>
          <small className="m-1 ml-2">
            {item.querySelector('pubDate').innerHTML}
          </small>
          <span className="ml-auto">
            <Favorite {...props} />
          </span>
        </div>
        {creator ? (
          <>
            <small>by {creator}</small>
          </>
        ) : null}
      </div>
    </div>
  )
}

FeedHeader.propTypes = {
  id: PropTypes.string,
  togglePaneElement: PropTypes.instanceOf(Object),
  item: PropTypes.instanceOf(Element),
}
export default FeedHeader
