import React from 'react'
import rss from '../services/rss.js'
import PropTypes from 'prop-types'

const initState = { title: '', description: '' }

const FeedsTableRow = ({ idx, setModal, url, handleDelete }) => {
  const [feedInfo, setFeedInfo] = React.useState(initState)
  React.useEffect(() => {
    const getFeedInfo = async () => {
      try {
        const info = await rss.fetchChannelInfo(url)
        console.log(info)
        setFeedInfo(info)
      } catch (e) {
        try {
          console.log('trying with cors proxy')
          const info = await rss.fetchChannelInfo(
            `https://cors-anywhere.herokuapp.com/${url}`,
          )
          setFeedInfo(info)
        } catch (e2) {
          setModal({
            title: 'Oops!',
            msg: `Cannot retrieve feed ${url}`,
          })
          console.log('Error', e2)
        }
      }
    }
    getFeedInfo()
  }, [url, setModal])

  return (
    <tr key={idx}>
      <td>
        <div className="table-remove d-flex justify-content-center">
          <button
            type="button"
            onClick={() => handleDelete(idx)}
            className="text-center btn btn-secondary btn-rounded btn-sm my-0"
          >
            Delete
          </button>
        </div>
      </td>
      <td id={`row-${idx}`} className="pt-3-half">
        <div
          className="mb-1"
          dangerouslySetInnerHTML={{
            __html: feedInfo.title,
          }}
        ></div>
      </td>
      <td id={`row-${idx}`} className="overflow-hidden">
        <p className="d-inline-block text-truncate">{url}</p>
      </td>
    </tr>
  )
}
FeedsTableRow.propTypes = {
  idx: PropTypes.number,
  setModal: PropTypes.func,
  handleDelete: PropTypes.func,
  url: PropTypes.string,
}
export default FeedsTableRow
