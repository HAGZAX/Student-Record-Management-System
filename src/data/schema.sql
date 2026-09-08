-- Dynamic Student Record Management System (SRMS)
-- MySQL Database Schema

CREATE DATABASE IF NOT EXISTS srms_db;
USE srms_db;

CREATE TABLE IF NOT EXISTS students (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  roll_no     VARCHAR(20) UNIQUE NOT NULL,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(100) UNIQUE NOT NULL,
  phone       VARCHAR(15),
  course      VARCHAR(50) NOT NULL,
  year        TINYINT NOT NULL CHECK (year BETWEEN 1 AND 4),
  gpa         DECIMAL(3,2) CHECK (gpa BETWEEN 0.00 AND 10.00),
  gender      ENUM('Male','Female','Other') NOT NULL,
  dob         DATE,
  address     TEXT,
  status      ENUM('Active','Inactive','Graduated') DEFAULT 'Active',
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Seed Data (For Testing)
INSERT INTO students (roll_no, name, email, phone, course, year, gpa, gender, dob, address, status) VALUES
('CS2023001', 'Alice Johnson', 'alice.j@example.com', '555-0101', 'Computer Science', 2, 8.50, 'Female', '2002-05-14', '123 Tech Lane, Silicon Valley', 'Active'),
('ME2022045', 'Bob Smith', 'bob.s@example.com', '555-0102', 'Mechanical Eng', 3, 7.20, 'Male', '2001-11-20', '456 Gear Blvd, Motor City', 'Active'),
('EE2024012', 'Charlie Davis', 'charlie.d@example.com', '555-0103', 'Electrical Eng', 1, 9.10, 'Male', '2004-02-28', '789 Spark St, Circuit Town', 'Active'),
('CE2021088', 'Diana Prince', 'diana.p@example.com', '555-0104', 'Civil Eng', 4, 8.90, 'Female', '2000-08-10', '101 Pillar Ave, Structure City', 'Graduated'),
('CS2023055', 'Ethan Hunt', 'ethan.h@example.com', '555-0105', 'Computer Science', 2, 5.50, 'Male', '2003-01-15', '202 Mission Rd, Impossible City', 'Inactive');

-- Basic CRUD Operations Documented

-- CREATE:
-- INSERT INTO students (roll_no, name, email, phone, course, year, gpa, gender, dob, address, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);

-- READ ALL:
-- SELECT * FROM students ORDER BY created_at DESC;

-- READ ONE:
-- SELECT * FROM students WHERE id = ?;

-- UPDATE:
-- UPDATE students SET roll_no=?, name=?, email=?, phone=?, course=?, year=?, gpa=?, gender=?, dob=?, address=?, status=? WHERE id=?;

-- DELETE:
-- DELETE FROM students WHERE id = ?;
