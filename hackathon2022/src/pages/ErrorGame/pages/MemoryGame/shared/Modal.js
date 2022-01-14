
import React from 'react';
import './Modal.css';
const Modal = ({ isOpen, children }) => {
    if (isOpen === false)
      return null

    return (
      <div>
        <div className="modal">
          {children}
        </div>
        <div className="bg"/>
      </div>
    )
}

export default Modal;