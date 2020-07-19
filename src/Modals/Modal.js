import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ title, msg, closeModal, buttons }) => (
  <>
    <div className="modal-backdrop fade show"></div>
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title">{title}</div>
            <button type="button" className="close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">{msg}</div>
          {buttons ? (
            <div className="modal-footer">
              {buttons.map((button, idx) => {
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={button.onClick}
                    className="btn btn-primary"
                  >
                    {button.text}
                  </button>
                )
              })}
              <button
                type="button"
                className="btn btn-secondary"
                onClick={closeModal}
                data-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  </>
)

Modal.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string,
  closeModal: PropTypes.func,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      onClick: PropTypes.number,
    }),
  ),
}

export default Modal
