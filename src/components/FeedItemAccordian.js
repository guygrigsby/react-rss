import React from 'react'
import PropTypes from 'prop-types'

const FeedItemAccordian = ({ id, item }) => {
  const imgalt =
    item.getElementsByTagName('media:description').item(0) &&
    item.getElementsByTagName('media:description').item(0).childNodes[0]
      .nodeValue
  const imgsrc =
    item.getElementsByTagName('media:content')[0] &&
    item.getElementsByTagName('media:content')[0].getAttribute('url')
  return (
    <>
      <div
        id={`collapse-${id}`}
        className="card-body collapse show"
        data-parent="#feedaccordian"
      >
        <div className="media">
          <img
            className="mr-3 mb-1 align-self-center"
            src={imgsrc}
            alt={imgalt}
          />
          <div className="media-body">
            <div
              className="mb-1"
              dangerouslySetInnerHTML={{
                __html: item.getElementsByTagName('description').item(0)
                  .childNodes[0].nodeValue,
              }}
            ></div>
            <p className="mb-1">{}</p>
          </div>
        </div>
      </div>
    </>
  )
}
FeedItemAccordian.propTypes = {
  id: PropTypes.string,
  isFave: PropTypes.bool,
  toggleFave: PropTypes.func,
  handleClick: PropTypes.func,
  item: PropTypes.instanceOf(Element),
}
export default FeedItemAccordian
