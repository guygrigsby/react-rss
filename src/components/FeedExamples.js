import React from 'react'
import PropTypes from 'prop-types'

const feeds = [
  'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  'http://xkcd.com/atom.xml',
  'http://feeds.gawker.com/lifehacker/full',
  'http://feeds.feedburner.com/oatmealfeed',
  'http://feeds.feedburner.com/HighScalability',
  'http://feeds.feedburner.com/codinghorror',
  'http://krebsonsecurity.com/feed/',
]

const FeedExamples = ({ setFeeds, setModal }) => {
  return (
    <div className="col-lg">
      <div className="p-4 s-2 border bg-light">
        <h3 className="text-center text-wrap pb-2">{'Nothing to read yet'}</h3>
        <p className="d-block ">
          {
            'We can add a few feeds for you to get started quicky if you like. (They are listed below) If not, add your own using the Add Feed button in at the top of the page.'
          }
        </p>
        {feeds.map((feed, idx) => (
          <span className="row pt-2 boarder" key={`${idx}-examplefeed`}>
            {feed}
          </span>
        ))}
        <div className="row m-4">
          <button
            type="button"
            onClick={() => setFeeds(feeds)}
            className="btn btn-primary ml-auto"
          >
            Sure
          </button>
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
