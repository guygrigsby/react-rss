import React from 'react'
import PropTypes from 'prop-types'
import Favorite from './Favorite.js'

const FeedHeader = (props) => {
  const { id, item, togglePaneElement } = props

  const creator =
    item.getElementsByTagName('dc:creator').item(0) &&
    item.getElementsByTagName('dc:creator').item(0).childNodes[0].nodeValue

  const publishDate = new Date(item.querySelector('pubDate').innerHTML)

  return (
    <div className="d-flex flex-row" id={`heading${id}`}>
      <div className="d-flex justify-content-center align-items-center m-2 pr-3">
        {togglePaneElement}
      </div>
      <div className="d-flex flex-column w-100" id={`heading${id}`}>
        <div className="d-flex flex-row">
          <h5 className="ml-1">
            {item.getElementsByTagName('title').item(0).childNodes[0].nodeValue}
          </h5>
          <span className="ml-auto">
            <Favorite {...props} />
          </span>
        </div>
        <div>
          <strong>{creator ? <>by {`${creator} `}</> : null}</strong>
          <small>{publishDate.toLocaleString()}</small>
        </div>
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
