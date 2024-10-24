import React, { createContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [profileState, setprofileState] = useState(null);
  const [employeeActivityReport, setemployeeActivityReport] = useState(null);
  const [allUsers, setallUsers] = useState(null);
  const [allBugs, setallBugs] = useState(null);
  const [others, setothers] = useState({
    totalBugs: 0,
  });

  const states = {
    profileState,
    setprofileState,
    employeeActivityReport,
    setemployeeActivityReport,
    allUsers,
    setallUsers,
    allBugs,
    setallBugs,
    others,
    setothers,
  };

  return <AppContext.Provider value={states}>{children}</AppContext.Provider>;
};

export default AppContext;
