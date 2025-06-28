import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import config from "../config/global";
import PropTypes from "prop-types";

const PrivateAdminRoute = ({ children }) => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem("login_token");
    const userStr = localStorage.getItem("user");

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        // Fetch user data from backend using the token
        fetch(`${config.back_end_url}/users/${user.email}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((res) => res.json())
          .then((data) => {
            setUserData(data?.data);
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
            setLoading(false);
          });
      } catch (error) {
        console.error("Error parsing user data:", error);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Check if token exists
  const token = localStorage.getItem("login_token");
  const userStr = localStorage.getItem("user");

  if (!token || !userStr) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // Check if user has master role
  if (userData?.role === "master") {
    return children;
  }

  // If not master role, redirect to dashboard
  return <Navigate to="/dashboard" replace />;
};

PrivateAdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateAdminRoute;
