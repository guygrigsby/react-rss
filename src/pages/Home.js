import React from 'react'
import PropTypes from 'prop-types'
import rss from '../services/rss.js'
import FeedExamples from '../components/FeedExamples.js'
import FeedList from '../components/FeedList'

const Home = (props) => {
  const { feeds, setItems, setFeeds, setModal } = props

  React.useEffect(() => {
    const getFeed = async () => {
      for (const feed of feeds) {
        try {
          const items = await rss.fetchCurrent(feed)
          setItems((prevState) => {
            return [...prevState, ...items]
          })
        } catch (e) {
          try {
            console.log('trying with cors proxy')
            const items = await rss.fetchCurrent(
              `https://cors-anywhere.herokuapp.com/${feed}`,
            )
            setItems((prevState) => {
              return [...prevState, ...items]
            })
          } catch (e2) {
            setModal({
              title: 'Oops!',
              msg: `Cannot retrieve feed ${feed}`,
            })
          }
        }
      }
    }
    getFeed()
  }, [feeds, setItems, setModal])

  return (
    <div className="container-fluid">
      <div className="col">
        <div className="row mt-2">
          {feeds && feeds.length > 0 ? (
            <div className="col">{<FeedList {...props} />}</div>
          ) : (
            <FeedExamples setFeeds={setFeeds} setModal={setModal} />
          )}
        </div>
      </div>
    </div>
  )
}

Home.propTypes = {
  setModal: PropTypes.func,
  setFeeds: PropTypes.func,
  feeds: PropTypes.arrayOf(PropTypes.string),
  setItems: PropTypes.func,
}
export default Home
