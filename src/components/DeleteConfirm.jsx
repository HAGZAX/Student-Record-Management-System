import React from 'react';

const DeleteConfirm = ({ show, student, onConfirm, onCancel }) => {
  if (!show) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border border-dark rounded-0">
            <div className="modal-header border-bottom border-dark">
              <h5 className="modal-title">Confirm Deletion</h5>
              <button type="button" className="btn-close" onClick={onCancel}></button>
            </div>
            <div className="modal-body text-center py-4">
              <p className="fs-5 mb-1">Are you sure you want to delete this record?</p>
              <div className="border border-dark p-3 my-3 mx-auto" style={{ maxWidth: '300px' }}>
                <h5 className="mb-0">{student?.name}</h5>
                <small>{student?.roll_no} • {student?.course}</small>
              </div>
              <p className="small mb-0">This action cannot be undone.</p>
            </div>
            <div className="modal-footer border-top border-dark justify-content-center">
              <button type="button" className="btn btn-outline-dark px-4" onClick={onCancel}>Cancel</button>
              <button type="button" className="btn btn-dark px-4" onClick={() => onConfirm(student?.id)}>
                Delete Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteConfirm;
