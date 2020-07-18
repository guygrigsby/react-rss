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
      <div className="m-2 p-2">{togglePaneElement}</div>
      <div className="d-flex flex-column w-100" id={`heading${id}`}>
        <div className="d-flex flex-row">
          <h5 className="ml-1">{item.querySelector('title').innerHTML}</h5>
          <small className="m-1 ml-2">{publishDate.toLocaleString()}</small>
          <span className="ml-auto">
            <Favorite {...props} />
          </span>
        </div>
        {creator ? (
          <>
            <small className="">by {creator}</small>
          </>
        ) : null}
      </div>
    </div>
  )
}

// parse a date format of
// Fri, 17 Jul 2020 10:23:00 +0000
function parseDate(str) {
  let p = str.split(' ')

  // new Date(year, month [, day [, hours[, minutes[, seconds[, ms]]]]])
  return new Date(p[3], p[2])
}

FeedHeader.propTypes = {
  id: PropTypes.string,
  togglePaneElement: PropTypes.instanceOf(Object),
  item: PropTypes.instanceOf(Element),
}
export default FeedHeader
