import Spinner from "pages/Login/Spinner/Spinner";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "./firebase/firebase.init";

const RequiredAuth = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return <Spinner></Spinner>;
  }

  if (user) {
    return children;
  } else {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
};

export default RequiredAuth;
