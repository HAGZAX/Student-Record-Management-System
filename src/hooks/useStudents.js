import { useState, useEffect } from 'react';

const initialData = [
  { id: 1, roll_no: 'CS2023001', name: 'Alice Johnson', email: 'alice.j@example.com', phone: '555-0101', course: 'Computer Science', year: 2, gpa: 8.50, gender: 'Female', dob: '2002-05-14', address: '123 Tech Lane, Silicon Valley', status: 'Active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 2, roll_no: 'ME2022045', name: 'Bob Smith', email: 'bob.s@example.com', phone: '555-0102', course: 'Mechanical Eng', year: 3, gpa: 7.20, gender: 'Male', dob: '2001-11-20', address: '456 Gear Blvd, Motor City', status: 'Active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 3, roll_no: 'EE2024012', name: 'Charlie Davis', email: 'charlie.d@example.com', phone: '555-0103', course: 'Electrical Eng', year: 1, gpa: 9.10, gender: 'Male', dob: '2004-02-28', address: '789 Spark St, Circuit Town', status: 'Active', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 4, roll_no: 'CE2021088', name: 'Diana Prince', email: 'diana.p@example.com', phone: '555-0104', course: 'Civil Eng', year: 4, gpa: 8.90, gender: 'Female', dob: '2000-08-10', address: '101 Pillar Ave, Structure City', status: 'Graduated', created_at: new Date().toISOString(), updated_at: new Date().toISOString() },
  { id: 5, roll_no: 'CS2023055', name: 'Ethan Hunt', email: 'ethan.h@example.com', phone: '555-0105', course: 'Computer Science', year: 2, gpa: 5.50, gender: 'Male', dob: '2003-01-15', address: '202 Mission Rd, Impossible City', status: 'Inactive', created_at: new Date().toISOString(), updated_at: new Date().toISOString() }
];

export const useStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = () => {
      const storedData = localStorage.getItem('srms_students');
      if (storedData) {
        setStudents(JSON.parse(storedData));
      } else {
        setStudents(initialData);
        localStorage.setItem('srms_students', JSON.stringify(initialData));
      }
      setLoading(false);
    };
    
    setTimeout(loadData, 300);
  }, []);

  const saveToStorage = (data) => {
    setStudents(data);
    localStorage.setItem('srms_students', JSON.stringify(data));
  };

  const addStudent = (newStudent) => {
    return new Promise((resolve, reject) => {
      if (students.some(s => s.roll_no === newStudent.roll_no)) {
        reject(new Error('Roll Number already exists!'));
        return;
      }
      if (students.some(s => s.email === newStudent.email)) {
        reject(new Error('Email already exists!'));
        return;
      }

      const id = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
      const student = {
        ...newStudent,
        id,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      saveToStorage([...students, student]);
      resolve(student);
    });
  };

  const updateStudent = (id, updatedData) => {
    return new Promise((resolve, reject) => {
      if (students.some(s => s.id !== id && s.roll_no === updatedData.roll_no)) {
        reject(new Error('Roll Number already exists!'));
        return;
      }
      if (students.some(s => s.id !== id && s.email === updatedData.email)) {
        reject(new Error('Email already exists!'));
        return;
      }

      const updatedStudents = students.map(student => 
        student.id === id 
          ? { ...student, ...updatedData, updated_at: new Date().toISOString() } 
          : student
      );
      
      saveToStorage(updatedStudents);
      resolve(updatedData);
    });
  };

  const deleteStudent = (id) => {
    return new Promise((resolve) => {
      const updatedStudents = students.filter(student => student.id !== id);
      saveToStorage(updatedStudents);
      resolve();
    });
  };

  return {
    students,
    loading,
    addStudent,
    updateStudent,
    deleteStudent
  };
};
