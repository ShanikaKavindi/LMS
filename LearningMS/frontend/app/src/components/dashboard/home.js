import React, { useEffect, useState } from 'react';
import './homeStyle.css'; // Add your custom styles here
import { getCourses, getInstructors } from '../../services/api'; // Add getInstructors API

const Home = () => {
  const [courses, setCourses] = useState([]);
  const [instructors, setInstructors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const courseData = await getCourses();
      const instructorData = await getInstructors();
      setCourses(courseData);
      setInstructors(instructorData);
    };

    fetchData();
  }, []);

  const handleEnroll = (courseCode) => {
    alert(`You have enrolled in course: ${courseCode}`);
    // Implement actual enrollment logic here
  };

  return (
    <div className="home-page">
      {/* Web Content Section */}
      <div className="web-content">
        <h1>Welcome to Virtual Learning Management System</h1>
        <p>
        Virtual Learning Management Systems (VLMS) are digital platforms designed to deliver,
        manage, and track online education and training programs. They provide functionalities such as 
        course creation, user management, content delivery, assessments, progress tracking, and 
        collaboration tools. VLMS support multimedia content, interactive learning, and mobile 
        accessibility while offering integration with third-party tools and customization options. 
        With features like gamification, compliance management, and detailed analytics, 
        these systems enhance flexibility, engagement, and scalability, making them essential for 
        modern education and corporate training.
        </p>
      </div>

      {/* Courses Section */}
      <h1 className="section-title">Courses</h1>
      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.code} className="course-card">
            <h2>{course.name}</h2>
            <p><strong>Code:</strong> {course.code}</p>
            <p><strong>Description:</strong> {course.description}</p>
            <p><strong>Duration:</strong> {course.duration}</p>
            <p><strong>Instructor:</strong> <span className="instructor-name">{course.instructor}</span></p>
            <button
              className="enroll-button"
              onClick={() => handleEnroll(course.code)}
            >
              Enroll
            </button>
          </div>
        ))}
      </div>

      {/* Instructors Section */}
      <h1 class="instructor-heading">Instructors</h1>
      <div className="instructor-grid">
        {instructors.map((instructor) => (
          <div key={instructor.email} className="instructor-card">
            <h2>{instructor.name}</h2>
            <p><strong>Designation:</strong> {instructor.designation}</p>
            <p><strong>Phone:</strong> {instructor.phone}</p>
            <p><strong>Email:</strong> {instructor.email}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
