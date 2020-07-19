import React from 'react'
import PropTypes from 'prop-types'
import FeedsTable from '../components/FeedsTable.js'
import FeedExamples from '../components/FeedExamples.js'

const Feeds = ({ feeds, setFeeds, setModal }) => {
  const handleDelete = (idx) => {
    console.log('idx', idx)
    const copy = [...feeds]
    copy.splice(idx, 1)
    console.log('copy', copy)
    setFeeds(copy)
  }
  console.log('feeds', feeds, 'feeds cond', feeds && feeds.length > 0)
  return (
    <div className="container-fluid m-2 p-2">
      <div className="row">
        {feeds && feeds.length > 0 ? (
          <FeedsTable
            feeds={feeds}
            setFeeds={setFeeds}
            handleDelete={handleDelete}
            setModal={setModal}
          />
        ) : (
          <FeedExamples setFeeds={setFeeds} setModal={setModal} />
        )}
      </div>
    </div>
  )
}
Feeds.propTypes = {
  feeds: PropTypes.arrayOf(PropTypes.string),
  setFeeds: PropTypes.func,
  setModal: PropTypes.func,
}
export default Feeds
