import React from 'react'
import PropTypes from 'prop-types'
import FeedTableRow from './FeedTableRow.js'

const FeedsTable = ({ feeds, handleDelete, setModal }) => {
  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Title</th>
            <th scope="col">URL</th>
            <th scope="col" className="text-center">
              Remove
            </th>
          </tr>
        </thead>
        <tbody>
          {feeds
            ? feeds.map((url, idx) => (
                <FeedTableRow
                  key={`${idx}-row-key`}
                  idx={idx}
                  url={url}
                  handleDelete={handleDelete}
                  setModal={setModal}
                />
              ))
            : null}
        </tbody>
      </table>
    </div>
  )
}

FeedsTable.propTypes = {
  setFeeds: PropTypes.func,
  handleDelete: PropTypes.func,
  feeds: PropTypes.arrayOf(PropTypes.string),
  setModal: PropTypes.func,
}
export default FeedsTable
