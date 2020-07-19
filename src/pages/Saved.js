import React from 'react'
import PropTypes from 'prop-types'
import FeedList from '../components/FeedList.js'

const Saved = (props) => {
  const { faves } = props
  const items = Array.from(faves, ([, value]) => value)
  return (
    <div className="container-fluid">
      <div className="col">{<FeedList items={items} {...props} />}</div>
    </div>
  )
}

Saved.propTypes = {
  faves: PropTypes.instanceOf(Map),
}

export default Saved
