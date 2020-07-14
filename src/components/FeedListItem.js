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

    console.log('toggle reading pane', paneOpen)
    setPaneOpen(!paneOpen)
  }

  const windowName = 'NYTimes'
  const icon = paneOpen ? 'fa fa-minus' : 'fa fa-plus'

  const link =
    item.getElementsByTagName('atom:link')[0] &&
    item.getElementsByTagName('atom:link')[0].getAttribute('href')
  const rel =
    item.getElementsByTagName('atom:link')[0] &&
    item.getElementsByTagName('atom:link')[0].getAttribute('rel')
  console.log('link', link, 'rel', rel)

  return (
    <li>
      <div
        className="list-group-item-action"
        type="button"
        onClick={() => window.open(link, windowName, `rel=${rel}`)}
        data-toggle="collapse"
        data-target={`#collapse-${id}`}
      >
        <span className="card">
          <span className="card-header">
            <FeedHeader
              togglePaneElement={
                <i onClick={togglePane} className={`${icon}`}></i>
              }
              {...props}
            />
          </span>
          {paneOpen ? <FeedItemAccordian item={item} {...props} /> : null}
        </span>
      </div>
    </li>
  )
}

FeedListItem.propTypes = {
  id: PropTypes.string,
  item: PropTypes.instanceOf(Element),
}
export default FeedListItem
