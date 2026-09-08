import React from 'react';

const Dashboard = ({ students }) => {
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'Active').length;
  
  const validGpas = students.filter(s => s.gpa !== null && s.gpa !== undefined);
  const avgGpa = validGpas.length > 0 
    ? (validGpas.reduce((sum, s) => sum + parseFloat(s.gpa), 0) / validGpas.length).toFixed(2) 
    : '0.00';
    
  const maleCount = students.filter(s => s.gender === 'Male').length;
  const femaleCount = students.filter(s => s.gender === 'Female').length;

  return (
    <div className="row g-3 mb-4">
      <div className="col-12 col-sm-6 col-md-3">
        <div className="hover-box p-3">
          <div>Total Students</div>
          <h3 className="m-0 fw-bold">{totalStudents}</h3>
        </div>
      </div>
      
      <div className="col-12 col-sm-6 col-md-3">
        <div className="hover-box p-3">
          <div>Active Enrolled</div>
          <h3 className="m-0 fw-bold">{activeStudents}</h3>
        </div>
      </div>
      
      <div className="col-12 col-sm-6 col-md-3">
        <div className="hover-box p-3">
          <div>Average GPA</div>
          <h3 className="m-0 fw-bold">{avgGpa}</h3>
        </div>
      </div>
      
      <div className="col-12 col-sm-6 col-md-3">
        <div className="hover-box p-3">
          <div>Gender Ratio</div>
          <h3 className="m-0 fw-bold">{maleCount} M / {femaleCount} F</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
