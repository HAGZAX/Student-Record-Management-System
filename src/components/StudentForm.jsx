import React, { useState, useEffect } from 'react';
import { validateStudentForm } from '../utils/validation';

const initialFormState = {
  roll_no: '',
  name: '',
  email: '',
  phone: '',
  course: '',
  year: '',
  gpa: '',
  gender: '',
  dob: '',
  address: '',
  status: 'Active'
};

const StudentForm = ({ show, student, onSave, onClose }) => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (show) {
      if (student) {
        setFormData({ ...student });
      } else {
        setFormData(initialFormState);
      }
      setErrors({});
    }
  }, [show, student]);

  if (!show) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateStudentForm(formData);
    
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await onSave(formData);
      onClose();
    } catch (error) {
      setErrors(prev => ({ ...prev, submit: error.message }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="modal-backdrop fade show"></div>
      <div className="modal fade show d-block" tabIndex="-1">
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content border border-dark rounded-0">
            <div className="modal-header border-bottom border-dark">
              <h5 className="modal-title">
                {student ? 'Edit Student Record' : 'Add New Student'}
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            
            <form onSubmit={handleSubmit}>
              <div className="modal-body p-4">
                {errors.submit && (
                  <div className="alert alert-danger py-2" role="alert">
                    {errors.submit}
                  </div>
                )}
                
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small mb-1">Roll Number </label>
                    <input 
                      type="text" 
                      className={`form-control border-dark ${errors.roll_no ? 'is-invalid' : ''}`} 
                      name="roll_no" 
                      value={formData.roll_no} 
                      onChange={handleChange}
                      placeholder="e.g. CS2023001"
                    />
                    {errors.roll_no && <div className="invalid-feedback">{errors.roll_no}</div>}
                  </div>
                  
                  <div className="col-md-6">
                    <label className="form-label small mb-1">Full Name </label>
                    <input 
                      type="text" 
                      className={`form-control border-dark ${errors.name ? 'is-invalid' : ''}`} 
                      name="name" 
                      value={formData.name} 
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small mb-1">Email </label>
                    <input 
                      type="email" 
                      className={`form-control border-dark ${errors.email ? 'is-invalid' : ''}`} 
                      name="email" 
                      value={formData.email} 
                      onChange={handleChange}
                      placeholder="student@example.com"
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                  </div>

                  <div className="col-md-6">
                    <label className="form-label small mb-1">Phone</label>
                    <input 
                      type="tel" 
                      className={`form-control border-dark ${errors.phone ? 'is-invalid' : ''}`} 
                      name="phone" 
                      value={formData.phone} 
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small mb-1">Course *</label>
                    <select 
                      className={`form-select border-dark ${errors.course ? 'is-invalid' : ''}`}
                      name="course" 
                      value={formData.course} 
                      onChange={handleChange}
                    >
                      <option value="">Select Course...</option>
                      <option value="Computer Science">Computer Science</option>
                      <option value="Mechanical Eng">Mechanical Eng</option>
                      <option value="Electrical Eng">Electrical Eng</option>
                      <option value="Civil Eng">Civil Eng</option>
                      <option value="Business Admin">Business Admin</option>
                      <option value="Data Science">Data Science</option>
                    </select>
                    {errors.course && <div className="invalid-feedback">{errors.course}</div>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small mb-1">Year</label>
                    <select 
                      className={`form-select border-dark ${errors.year ? 'is-invalid' : ''}`}
                      name="year" 
                      value={formData.year} 
                      onChange={handleChange}
                    >
                      <option value="">Select Year...</option>
                      <option value="1">First Year (1)</option>
                      <option value="2">Second Year (2)</option>
                      <option value="3">Third Year (3)</option>
                      <option value="4">Fourth Year (4)</option>
                    </select>
                    {errors.year && <div className="invalid-feedback">{errors.year}</div>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small mb-1">GPA</label>
                    <input 
                      type="number" 
                      step="0.01"
                      min="0"
                      max="10"
                      className={`form-control border-dark ${errors.gpa ? 'is-invalid' : ''}`} 
                      name="gpa" 
                      value={formData.gpa} 
                      onChange={handleChange}
                      placeholder="e.g. 8.5"
                    />
                    {errors.gpa && <div className="invalid-feedback">{errors.gpa}</div>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small mb-1">Gender </label>
                    <select 
                      className={`form-select border-dark ${errors.gender ? 'is-invalid' : ''}`}
                      name="gender" 
                      value={formData.gender} 
                      onChange={handleChange}
                    >
                      <option value="">Select Gender...</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small mb-1">Date of Birth</label>
                    <input 
                      type="date" 
                      className="form-control border-dark" 
                      name="dob" 
                      value={formData.dob} 
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-md-4">
                    <label className="form-label small mb-1">Status</label>
                    <select 
                      className="form-select border-dark"
                      name="status" 
                      value={formData.status} 
                      onChange={handleChange}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                      <option value="Graduated">Graduated</option>
                    </select>
                  </div>

                  <div className="col-12">
                    <label className="form-label small mb-1">Address</label>
                    <textarea 
                      className="form-control border-dark" 
                      name="address" 
                      rows="2"
                      value={formData.address} 
                      onChange={handleChange}
                      placeholder="Full residential address"
                    ></textarea>
                  </div>
                </div>
              </div>
              
              <div className="modal-footer border-top border-dark">
                <button type="button" className="btn btn-outline-dark" onClick={onClose} disabled={isSubmitting}>Cancel</button>
                <button type="submit" className="btn btn-dark" disabled={isSubmitting}>
                  {isSubmitting ? 'Saving...' : (student ? 'Update Record' : 'Save Record')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentForm;
