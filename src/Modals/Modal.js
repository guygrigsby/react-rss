import React from 'react'
import PropTypes from 'prop-types'

const Modal = ({ title, msg, closeModal }) => (
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
        </div>
      </div>
    </div>
  </>
)

Modal.propTypes = {
  title: PropTypes.string,
  msg: PropTypes.string,
  closeModal: PropTypes.func,
}

export default Modal
