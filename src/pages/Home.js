import React from 'react'
import PropTypes from 'prop-types'
import rss from '../services/rss.js'
import FeedList from '../components/FeedList'

const Home = (props) => {
  const { feedURL, setItems } = props

  React.useEffect(() => {
    const getFeed = async () => {
      try {
        const items = await rss.fetchCurrent(feedURL)
        setItems(items)
      } catch (e) {
        try {
          const items = await rss.fetchCurrent(
            `https://cors-anywhere.herokuapp.com/${feedURL}`,
          )
          setItems(items)
        } catch (e2) {
          console.log('caught exception', e, 'in Homepage')
        }
      }
    }
    getFeed()
  }, [feedURL])

  return (
    <div className="container-fluid m-2 p-2">
      <div className="row">
        <div className="col">{<FeedList {...props} />}</div>
      </div>
    </div>
  )
}

Home.propTypes = {
  feedURL: PropTypes.string,
  setItems: PropTypes.func,
}
export default Home
