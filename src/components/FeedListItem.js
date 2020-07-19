import React from 'react'
import FeedItemAccordian from '../components/FeedItemAccordian.js'
import FeedHeader from '../components/FeedHeader.js'
import PropTypes from 'prop-types'

const FeedListItem = (props) => {
  const { id, item } = props
  const [paneOpen, setPaneOpen] = React.useState(false)

  const togglePane = (e) => {
    e.stopPropagation()
    e.preventDefault()

    setPaneOpen(!paneOpen)
  }

  const icon = paneOpen ? 'fa fa-minus' : 'fa fa-plus'

  const link =
    item.getElementsByTagName('atom:link')[0] &&
    item.getElementsByTagName('atom:link')[0].getAttribute('href')
  const rel =
    item.getElementsByTagName('atom:link')[0] &&
    item.getElementsByTagName('atom:link')[0].getAttribute('rel')

  return (
    <li className="w-100">
      <span
        className="card list-group-item-action"
        onClick={() => window.open(link, { id }, `rel=${rel}`)}
        data-toggle="collapse"
        data-target={`#collapse-${id}`}
      >
        <span className="card-header">
          <FeedHeader
            togglePaneElement={
              <div
                onClick={togglePane}
                className="d-flex justify-content-center align-items-center m-2 pr-3"
              >
                <i className={`${icon}`}></i>
              </div>
            }
            {...props}
          />
        </span>
        {paneOpen ? <FeedItemAccordian item={item} {...props} /> : null}
      </span>
    </li>
  )
}

FeedListItem.propTypes = {
  id: PropTypes.string,
  item: PropTypes.instanceOf(Element),
}
export default FeedListItem
