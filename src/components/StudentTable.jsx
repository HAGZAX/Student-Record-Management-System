import React, { useState } from 'react';

const StudentTable = ({ students, onEdit, onDelete, onView }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'id', direction: 'desc' });
  const [filterCourse, setFilterCourse] = useState('');
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const processedStudents = [...students]
    .filter(student => {
      const searchMatch = 
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        student.roll_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase());
        
      const courseMatch = filterCourse ? student.course === filterCourse : true;
      
      return searchMatch && courseMatch;
    })
    .sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

  const uniqueCourses = [...new Set(students.map(s => s.course))].filter(Boolean);

  const totalPages = Math.ceil(processedStudents.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = processedStudents.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="box-container p-3">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-3">
        <h4 className="m-0">Students Directory</h4>
        
        <div className="d-flex gap-2">
          <input 
            type="text" 
            className="form-control border-dark" 
            placeholder="Search name, roll no, email..." 
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
          />
          <select 
            className="form-select border-dark" 
            value={filterCourse}
            onChange={(e) => { setFilterCourse(e.target.value); setCurrentPage(1); }}
          >
            <option value="">All Courses</option>
            {uniqueCourses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered border-dark mb-0">
          <thead>
            <tr>
              <th scope="col" style={{ cursor: 'pointer' }} onClick={() => requestSort('roll_no')}>
                Roll No {sortConfig.key === 'roll_no' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th scope="col" style={{ cursor: 'pointer' }} onClick={() => requestSort('name')}>
                Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th scope="col" style={{ cursor: 'pointer' }} onClick={() => requestSort('email')}>
                Email {sortConfig.key === 'email' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th scope="col" style={{ cursor: 'pointer' }} onClick={() => requestSort('course')}>
                Course & Year {sortConfig.key === 'course' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th scope="col" style={{ cursor: 'pointer' }} onClick={() => requestSort('gpa')}>
                GPA {sortConfig.key === 'gpa' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th scope="col" style={{ cursor: 'pointer' }} onClick={() => requestSort('status')}>
                Status {sortConfig.key === 'status' ? (sortConfig.direction === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th scope="col" className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((student) => (
                <tr key={student.id}>
                  <td>{student.roll_no}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>
                    <div>{student.course}</div>
                    <small>Year {student.year}</small>
                  </td>
                  <td>{student.gpa || '-'}</td>
                  <td>{student.status}</td>
                  <td className="text-end">
                    <div className="btn-group btn-group-sm">
                      <button className="btn btn-outline-dark" onClick={() => onView(student)}>View</button>
                      <button className="btn btn-outline-dark" onClick={() => onEdit(student)}>Edit</button>
                      <button className="btn btn-outline-dark" onClick={() => onDelete(student)}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-3">
          <small>
            Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, processedStudents.length)} of {processedStudents.length} entries
          </small>
          <div className="btn-group btn-group-sm">
            <button 
              className="btn btn-outline-dark" 
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i} 
                className={`btn ${currentPage === i + 1 ? 'btn-dark' : 'btn-outline-dark'}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button 
              className="btn btn-outline-dark" 
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentTable;
