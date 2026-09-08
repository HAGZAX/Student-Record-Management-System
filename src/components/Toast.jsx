import React, { useEffect } from 'react';

const Toast = ({ show, message, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div className="position-fixed bottom-0 end-0 p-3" style={{ zIndex: 1100 }}>
      <div className="border border-dark bg-white text-dark p-3 d-flex align-items-center">
        <div className="me-4 flex-grow-1">
          <p className="mb-0 fw-medium">{message}</p>
        </div>
        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
      </div>
    </div>
  );
};

export default Toast;
