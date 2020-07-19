import React from 'react'
import PropTypes from 'prop-types'

const feeds = [
  'http://blogs.nasa.gov/stationreport/feed/',
  'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
]

const FeedExamples = ({ setFeeds, setModal }) => {
  return (
    <div className="container">
      <div className="p-4 align-items-center">
        <div className="col p-4 border bg-light">
          {
            "There's nothing here to read! Would you like us to set a few default feeds?"
          }
          {feeds.map((feed, idx) => (
            <span className="row p-4" key={`${idx}-examplefeed`}>
              {feed}
            </span>
          ))}
          <div className="row p-4">
            <button
              type="button"
              onClick={() => setFeeds(feeds)}
              className="btn btn-primary ml-auto p-2"
            >
              Sure
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

FeedExamples.propTypes = {
  setFeeds: PropTypes.func,
  setModal: PropTypes.func,
}
export default FeedExamples
