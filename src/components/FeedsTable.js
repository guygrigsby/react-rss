import React from 'react'
import PropTypes from 'prop-types'

const FeedsTable = ({ feeds, handleDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">URL</th>
          <th scope="col" className="text-center">
            Remove
          </th>
        </tr>
      </thead>
      <tbody>
        {feeds.map((url, idx) => {
          return (
            <tr key={idx}>
              <th scope="row">{idx}</th>
              <td id={`row-${idx}`} className="pt-3-half">
                {url}
              </td>
              <td>
                <div className="table-remove">
                  <button
                    type="button"
                    onClick={(e) => handleDelete(idx)}
                    className="text-center btn btn-danger btn-rounded btn-sm my-0"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
FeedsTable.propTypes = {
  handleDelete: PropTypes.func,
  feeds: PropTypes.arrayOf(PropTypes.string),
}
export default FeedsTable
