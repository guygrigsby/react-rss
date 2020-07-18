import React from 'react'
import PropTypes from 'prop-types'
import FeedList from '../components/FeedList.js'

const Saved = (props) => {
  const { faves } = props
  const items = Array.from(faves, ([, value]) => value)
  console.log('faves converted in Saved page', items)
  return (
    <div className="container-fluid m-2 p-2">
      <div className="row">
        <div className="col">{<FeedList items={items} {...props} />}</div>
      </div>
    </div>
  )
}

Saved.propTypes = {
  faves: PropTypes.instanceOf(Map),
}

export default Saved
