import React, { useState } from 'react';
import './App.css';
import { useStudents } from './hooks/useStudents';

import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import StudentTable from './components/StudentTable';
import StudentForm from './components/StudentForm';
import StudentCard from './components/StudentCard';
import DeleteConfirm from './components/DeleteConfirm';
import Toast from './components/Toast';

const App = () => {
  const { students, loading, addStudent, updateStudent, deleteStudent } = useStudents();
  
  const [formModal, setFormModal] = useState({ show: false, student: null });
  const [viewModal, setViewModal] = useState({ show: false, student: null });
  const [deleteModal, setDeleteModal] = useState({ show: false, student: null });
  
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  const handleOpenAdd = () => setFormModal({ show: true, student: null });
  const handleOpenEdit = (student) => setFormModal({ show: true, student });
  const handleCloseForm = () => setFormModal({ show: false, student: null });
  
  const handleSaveStudent = async (studentData) => {
    try {
      if (formModal.student) {
        await updateStudent(formModal.student.id, studentData);
        showToast('Student record updated successfully!');
      } else {
        await addStudent(studentData);
        showToast('New student added successfully!');
      }
      handleCloseForm();
    } catch (error) {
      throw error;
    }
  };

  const handleOpenView = (student) => setViewModal({ show: true, student });
  const handleCloseView = () => setViewModal({ show: false, student: null });

  const handleOpenDelete = (student) => setDeleteModal({ show: true, student });
  const handleCloseDelete = () => setDeleteModal({ show: false, student: null });
  
  const handleConfirmDelete = async (id) => {
    try {
      await deleteStudent(id);
      showToast('Student record deleted permanently.');
      handleCloseDelete();
    } catch (error) {
      showToast(error.message || 'Failed to delete record.', 'error');
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="spinner-border text-dark" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      
      <main className="container pb-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="m-0">Overview</h2>
          <button 
            className="btn btn-outline-dark"
            onClick={handleOpenAdd}
          >
            + Add Student
          </button>
        </div>

        <Dashboard students={students} />
        
        <StudentTable 
          students={students}
          onEdit={handleOpenEdit}
          onDelete={handleOpenDelete}
          onView={handleOpenView}
        />
      </main>

      <StudentForm 
        show={formModal.show} 
        student={formModal.student}
        onSave={handleSaveStudent}
        onClose={handleCloseForm} 
      />
      
      <StudentCard 
        show={viewModal.show} 
        student={viewModal.student}
        onClose={handleCloseView} 
      />
      
      <DeleteConfirm 
        show={deleteModal.show} 
        student={deleteModal.student}
        onConfirm={handleConfirmDelete}
        onCancel={handleCloseDelete} 
      />

      <Toast 
        show={toast.show}
        message={toast.message}
        onClose={() => setToast(prev => ({ ...prev, show: false }))}
      />
    </>
  );
};

export default App;