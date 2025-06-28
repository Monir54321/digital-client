import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  // Check if token exists in localStorage
  const token = localStorage.getItem("login_token");
  const userStr = localStorage.getItem("user");

  // If no token or user data, redirect to login
  if (!token || !userStr) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  // If token exists, render the children
  return children;
};

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PrivateRoute;
