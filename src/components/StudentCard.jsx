import React from 'react';

const StudentCard = ({ show, student, onClose }) => {
  if (!show || !student) return null;

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border border-dark rounded-0">
            <div className="modal-header border-bottom border-dark">
              <h5 className="modal-title">Student Details - {student.roll_no}</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            
            <div className="modal-body p-4">
              <div className="mb-3">
                <h3>{student.name}</h3>
                <p>Status: {student.status}</p>
              </div>

              <div className="row g-3">
                <div className="col-md-6">
                  <div className="border border-dark p-3">
                    <h6 className="fw-bold border-bottom border-dark pb-2 mb-2">Academic Info</h6>
                    <div><strong>Course:</strong> {student.course}</div>
                    <div><strong>Year:</strong> {student.year}</div>
                    <div><strong>GPA:</strong> {student.gpa || 'N/A'}</div>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="border border-dark p-3">
                    <h6 className="fw-bold border-bottom border-dark pb-2 mb-2">Personal Info</h6>
                    <div><strong>Email:</strong> {student.email}</div>
                    <div><strong>Phone:</strong> {student.phone || 'N/A'}</div>
                    <div><strong>Gender:</strong> {student.gender}</div>
                    <div><strong>DOB:</strong> {student.dob || 'N/A'}</div>
                  </div>
                </div>
                
                {student.address && (
                  <div className="col-12">
                    <div className="border border-dark p-3">
                      <h6 className="fw-bold border-bottom border-dark pb-2 mb-2">Address</h6>
                      <p className="mb-0">{student.address}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="modal-footer border-top border-dark">
              <button type="button" className="btn btn-outline-dark" onClick={onClose}>Close</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentCard;
