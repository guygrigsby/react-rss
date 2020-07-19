import React from 'react'
import PropTypes from 'prop-types'
import FeedsTable from '../components/FeedsTable.js'

const Feeds = ({ feeds, setFeeds, setModal }) => {
  const handleDelete = (idx) => {
    console.log('idx', idx)
    const copy = [...feeds]
    copy.splice(idx, 1)
    console.log('copy', copy)
    setFeeds(copy)
  }
  return (
    <FeedsTable feeds={feeds} handleDelete={handleDelete} setModal={setModal} />
  )
}
Feeds.propTypes = {
  feeds: PropTypes.arrayOf(PropTypes.string),
  setFeeds: PropTypes.func,
  setModal: PropTypes.func,
}
export default Feeds
