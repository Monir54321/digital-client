import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
import config from "../config/global";
import auth from "../firebase/firebase.config";

const PrivateAdminRoute = ({ children }) => {
  const [user, loading, error] = useAuthState(auth);
  const location = useLocation();

  const [userData, setUserData] = useState(null);

  if (loading && userData == null) {
    return <Loading />;
  }

  useEffect(() => {
    fetch(`${config.back_end_url}/users/${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setUserData(data?.data);
      });
  }, [user]);

  if (user && userData?.role == "master") {
    return children;
  }

  if (!loading && !user && userData?.role != "master") {
    signOut(auth);
    return (
      <Navigate to="/" state={{ from: location }} replace={true}></Navigate>
    );
  }
};

export default PrivateAdminRoute;
