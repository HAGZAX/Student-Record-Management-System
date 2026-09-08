export const validateStudentForm = (formData) => {
  const errors = {};

  if (!formData.roll_no || formData.roll_no.trim() === '') {
    errors.roll_no = 'Roll Number is required';
  } else if (!/^[A-Z0-9]{5,15}$/i.test(formData.roll_no)) {
    errors.roll_no = 'Roll Number should be 5-15 alphanumeric characters';
  }

  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters';
  }

  if (!formData.email || formData.email.trim() === '') {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errors.email = 'Invalid email address';
  }

  if (formData.phone && !/^\+?[0-9\s-]{7,15}$/.test(formData.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  if (!formData.course || formData.course.trim() === '') {
    errors.course = 'Course is required';
  }

  if (!formData.year || isNaN(formData.year) || formData.year < 1 || formData.year > 4) {
    errors.year = 'Year must be between 1 and 4';
  }

  if (formData.gpa && (isNaN(formData.gpa) || formData.gpa < 0 || formData.gpa > 10)) {
    errors.gpa = 'GPA must be between 0.00 and 10.00';
  }

  if (!formData.gender) {
    errors.gender = 'Gender is required';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
