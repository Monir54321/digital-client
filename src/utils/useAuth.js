import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase/firebase.config";
import { getAuthenticatedUser, getUserFromToken } from "./getUserData";

const useAuth = () => {
  const [firebaseUser, firebaseLoading, firebaseError] = useAuthState(auth);
  const [tokenUser, setTokenUser] = useState(null);
  const [tokenLoading, setTokenLoading] = useState(true);
  const [tokenError, setTokenError] = useState(null);

  useEffect(() => {
    const checkTokenAuth = async () => {
      setTokenLoading(true);
      try {
        const { user, isAuthenticated } = await getAuthenticatedUser();
        setTokenUser(isAuthenticated ? user : null);
        setTokenError(null);
      } catch (error) {
        console.error("Token authentication error:", error);
        setTokenError(error.message);
        setTokenUser(null);
      } finally {
        setTokenLoading(false);
      }
    };

    // Only check token auth if no Firebase user
    if (!firebaseUser) {
      checkTokenAuth();
    } else {
      setTokenUser(null);
      setTokenLoading(false);
    }
  }, [firebaseUser]);

  // Determine the current user and loading state
  const user = firebaseUser || tokenUser;
  const loading = firebaseLoading || tokenLoading;
  const error = firebaseError || tokenError;

  // Check if user is authenticated via any method
  const isAuthenticated = !!user;

  // Get user data from localStorage if using token auth
  const getLocalStorageUser = () => {
    if (tokenUser) {
      return getUserFromToken();
    }
    return { token: null, user: null, isAuthenticated: false };
  };

  // Logout function that handles both Firebase and token auth
  const logout = () => {
    if (firebaseUser) {
      // Firebase logout
      auth.signOut();
    } else if (tokenUser) {
      // Token logout - clear localStorage
      localStorage.removeItem("login_token");
      localStorage.removeItem("user");
      setTokenUser(null);
    }
  };

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isFirebaseUser: !!firebaseUser,
    isTokenUser: !!tokenUser,
    getLocalStorageUser,
    logout,
  };
};

export default useAuth;
