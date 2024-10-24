import React from "react";
import { Navigate } from "react-router-dom";
import {
  getLocalStorageToken,
  getLocalStorageRole,
} from "../helpers/localstorage";

const ProtectedRoute = ({ roles = "*", children }) => {
  const isHavingToken = getLocalStorageToken();
  const role = getLocalStorageRole();

  if (!isHavingToken) return <Navigate to="/login" />;
  else if (roles === "*") {
    return children;
  } else if (Array.isArray(roles) && roles.includes(role)) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
