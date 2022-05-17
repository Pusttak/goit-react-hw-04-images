import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdOutlineClose } from 'react-icons/md';
import s from './Modal.module.scss';

const Modal = ({ onClose, children }) => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  });

  const handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <button className={s.closeButton} type="button" onClick={onClose}>
        <MdOutlineClose size="30px" color="fff" />
      </button>
      <div className={s.Modal}>{children}</div>
    </div>
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};
