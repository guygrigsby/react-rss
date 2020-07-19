import React from 'react'
import PropTypes from 'prop-types'
import rss from '../services/rss.js'
import FeedList from '../components/FeedList'

const Home = (props) => {
  const { feeds, setItems, setModal } = props
  const feedURL = feeds[0]

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
              `https://cors-anywhere.herokuapp.com/${feedURL}`,
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
  }, [feedURL, setItems])

  return (
    <div className="container-fluid m-2 p-2">
      <div className="row">
        <div className="col">{<FeedList {...props} />}</div>
      </div>
    </div>
  )
}

Home.propTypes = {
  setModal: PropTypes.func,
  feeds: PropTypes.arrayOf(PropTypes.string),
  setItems: PropTypes.func,
}
export default Home
