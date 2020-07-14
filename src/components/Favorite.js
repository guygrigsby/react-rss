import React from 'react'
import PropTypes from 'prop-types'

const Favorite = ({ isFave, toggleFave, item }) => {
  const faveClassName = isFave ? 'text-primary' : 'text=secondary'
  return (
    <span className={faveClassName} onClick={(e) => toggleFave(e, item)}>
      <i className="fas fa-star fa-2x mr-3"></i>
    </span>
  )
}

Favorite.propTypes = {
  toggleFave: PropTypes.func,
  isFave: PropTypes.bool,
  item: PropTypes.instanceOf(Element),
}
export default Favorite
