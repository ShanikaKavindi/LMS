// src/services/api.js

const BASE_URL = "http://127.0.0.1:8000/api"; // Replace with your backend URL

export const login = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: data.message };
    } else {
      if( data.message && data.message !== '')
      {
        return { success: false, message: data.message };
      }
      else if( data.non_field_errors &&  data.non_field_errors !== '')
      {
        return { success: false, message: data.non_field_errors[0] };
      }
      else
      {
        return { success: false, message: "Invalid User Name or Password. Please try again!" };
      }
    }
  } catch (error) {
    return { success: false, message: "Something went wrong. Please try again." };
  }
};

export const register = async ({ username, email, password }) => {
  try {
    const response = await fetch(`${BASE_URL}/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Registration successful. Please log in." };
    } else {
      return { success: false, message: data.message || "Registration failed." };
    }
  } catch (error) {
    return { success: false, message: "Something went wrong. Please try again." };
  }
};

export const getCourses = async () => {
  try {
    const response = await fetch(`${BASE_URL}/courses/`);
    if (!response.ok) {
      throw new Error('Failed to fetch courses');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getInstructors = async () => {
  try {
    const response = await fetch(`${BASE_URL}/instructors/`);
    if (!response.ok) {
      throw new Error('Failed to fetch instructors');
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const updateCourse = async (courseCode, updatedData) => {
  try {
    const response = await fetch(`${BASE_URL}/courses/${courseCode}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: "Course updated successfully.", data };
    } else {
      return { success: false, message: data.message || "Failed to update the course." };
    }
  } catch (error) {
    return { success: false, message: "Something went wrong. Please try again." };
  }
};



