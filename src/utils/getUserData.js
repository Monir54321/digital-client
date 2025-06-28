import axios from "axios";
import { useEffect, useState } from "react";
import config from "../config/global";

const useUserData = (email) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${config.back_end_url}/users/${email}`
        );
        setData(response.data.data); // Adjust this according to your data structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email]);

  return { data, loading, error };
};

// Function to get user from localStorage token
export const getUserFromToken = () => {
  try {
    const token = localStorage.getItem("login_token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      const user = JSON.parse(userStr);
      return { token, user, isAuthenticated: true };
    }
    return { token: null, user: null, isAuthenticated: false };
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return { token: null, user: null, isAuthenticated: false };
  }
};

// Function to validate token with backend
export const validateToken = async (token) => {
  try {
    const response = await fetch(`${config.back_end_url}/auth/validate-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data.status === "Success";
  } catch (error) {
    console.error("Token validation error:", error);
    return false;
  }
};

// Function to get authenticated user data (combines token validation and user data)
export const getAuthenticatedUser = async () => {
  const { token, user, isAuthenticated } = getUserFromToken();

  if (!isAuthenticated) {
    return { user: null, isAuthenticated: false, loading: false };
  }

  // Validate token with backend
  const isValid = await validateToken(token);

  if (!isValid) {
    // Clear invalid token
    localStorage.removeItem("login_token");
    localStorage.removeItem("user");
    return { user: null, isAuthenticated: false, loading: false };
  }

  return { user, isAuthenticated: true, loading: false };
};

export default useUserData;
