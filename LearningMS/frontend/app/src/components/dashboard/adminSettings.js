import React, { useState, useEffect } from 'react';
import './adminSettings.css';
import { getCourses, updateCourse } from '../../services/api';

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('course');
  const [courses, setCourses] = useState([]);
  const [editingCourse, setEditingCourse] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  useEffect(() => {
    if (activeTab === 'course') {
      const fetchCourses = async () => {
        try {
          const data = await getCourses(); // Fetch courses from API
          setCourses(data);
          setErrorMessage(''); // Clear error messages when data loads successfully
        } catch (error) {
          setErrorMessage('Failed to fetch courses. Please try again.');
        }
      };
      fetchCourses();
    }
  }, [activeTab]);

  // Handler for saving the updated course
  const handleSaveCourse = async (updatedCourse) => {
    try {
      await updateCourse(updatedCourse.code, updatedCourse); // PUT request to update the course
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course.code === updatedCourse.code ? updatedCourse : course
        )
      );
      setEditingCourse(null); // Close the edit form
      setErrorMessage(''); // Clear any error message
    } catch (error) {
      setErrorMessage('An error occurred while updating the course. Please try again.');
    }
  };

  // Handler for canceling the edit mode
  const handleCancelEdit = () => {
    setEditingCourse(null); // Exit edit mode
    setErrorMessage(''); // Clear error messages
  };

  // Form for editing a course
  const renderEditForm = () => (
    <div className="edit-course-form">
      <h2>Edit Course</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSaveCourse(editingCourse);
        }}
      >
        <label>
          Name:
          <input
            type="text"
            value={editingCourse.name}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, name: e.target.value })
            }
          />
        </label>
        <label>
          Code:
          <input
            type="text"
            value={editingCourse.code}
            disabled
          />
        </label>
        <label>
          Description:
          <textarea
            value={editingCourse.description}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, description: e.target.value })
            }
          ></textarea>
        </label>
        <label>
          Duration:
          <input
            type="number"
            value={editingCourse.duration}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, duration: e.target.value })
            }
          />
        </label>
        <label>
          Instructor:
          <input
            type="text"
            value={editingCourse.instructor}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, instructor: e.target.value })
            }
          />
        </label>
        {errorMessage && (
          <div className="message error">{errorMessage}</div>
        )}
        <div className="button-container">
          <button type="submit" className="save-button">
            Save
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={handleCancelEdit}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  // Render course cards
  const renderCourses = () => (
    <div className="course-grid">
      {courses.map((course) => (
        <div key={course.code} className="course-card">
          <h2>{course.name}</h2>
          <p>
            <strong>Code:</strong> {course.code}
          </p>
          <p>
            <strong>Description:</strong> {course.description}
          </p>
          <p>
            <strong>Duration:</strong> {course.duration}
          </p>
          <p>
            <strong>Instructor:</strong> {course.instructor}
          </p>
          <button
            className="edit-button"
            onClick={() => setEditingCourse(course)}
          >
            Edit
          </button>
        </div>
      ))}
    </div>
  );

  // Render content based on the active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'course':
        return editingCourse ? renderEditForm() : renderCourses();
      case 'instructor':
        return <div>Instructor Setting Content</div>;
      case 'group':
        return <div>Group Setting Content</div>;
      case 'addContent':
        return <div>Add Content Section</div>;
      case 'quiz':
        return <div>Quiz Setting Content</div>;
      default:
        return null;
    }
  };

  return (
    <div className="admin-settings-page">
      <div className="admin-settings-menu">
        <button
          className={`menu-button ${activeTab === 'course' ? 'active' : ''}`}
          onClick={() => setActiveTab('course')}
        >
          Course Setting
        </button>
        <button
          className={`menu-button ${activeTab === 'instructor' ? 'active' : ''}`}
          onClick={() => setActiveTab('instructor')}
        >
          Instructor Setting
        </button>
        <button
          className={`menu-button ${activeTab === 'group' ? 'active' : ''}`}
          onClick={() => setActiveTab('group')}
        >
          Group Setting
        </button>
        <button
          className={`menu-button ${activeTab === 'addContent' ? 'active' : ''}`}
          onClick={() => setActiveTab('addContent')}
        >
          Add Contents
        </button>
        <button
          className={`menu-button ${activeTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveTab('quiz')}
        >
          Quiz Settings
        </button>
      </div>
      {errorMessage && !editingCourse && (
        <div className="message error">{errorMessage}</div>
      )}
      <div className="admin-settings-content">{renderContent()}</div>
    </div>
  );
};

export default AdminSettings;
