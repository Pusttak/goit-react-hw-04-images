import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineClose } from 'react-icons/md';
import s from './Modal.module.scss';

const Modal = ({ closeModal, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      closeModal();
    }
  };

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <button className={s.closeButton} type="button" onClick={closeModal}>
        <MdOutlineClose size="30px" color="fff" />
      </button>
      <div className={s.Modal}>{children}</div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
};
