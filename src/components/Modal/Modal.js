import s from './Modal.module.css';
//import React, { useEffect } from "react";
//import ReactDOM from 'react-dom';
import { createPortal } from 'react-dom';
import React, { Component } from "react";
//import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#root');

 class Modal extends Component  {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  handleOverlayClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.overlay} onClick={this.handleOverlayClick}>
        <div className={s.modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

export default Modal;

// import React, { useEffect } from "react";

// const Modal = ({ children, toggleModal }) => {
//   useEffect(() => {
//     const handleKeyDown = (e) => {
//       if (e.code === "Escape") {
//         toggleModal();
//       }
//     };
//     window.addEventListener("keydown", handleKeyDown);
//     return () => {
//       window.removeEventListener("keydown", handleKeyDown);
//     };
//   }, [toggleModal]);

//   const handleBackdropClick = (e) => {
//     if (e.currentTarget === e.target) {
//       toggleModal();
//     }
//   };

//   return (
//     <div onClick={handleBackdropClick} className={s.overlay}>
//       <div className={s.modal}>{children}</div>
//     </div>
//   );
// };

// export default Modal;