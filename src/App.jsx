import { useContext, useEffect } from "react";
import "./App.css";
import AppContext from "./context/ContextWrapper";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./views/pages/LoginPage";
import { Toaster } from "react-hot-toast";
import ProtectedRoute from "./rotues/ProtectedRoute";
import Home from "./views/pages/Home";
import BugReportGraph from "./views/pages/BugReportGraph";
import RegisterPage from "./views/pages/RegisterPage";
import { getMyProfileServices } from "./services/user.api";
import MyProfile from "./views/pages/MyProfile";
import SingleEmployeeReport from "./views/pages/SingleEmployeeReport";
import {
  removeLocalStorageRole,
  removeLocalStorageToken,
} from "./helpers/localstorage";
import CreateBug from "./views/pages/CreateBug";
import CreatedBugsList from "./views/pages/CreatedBugsList";
import AssignedBugsList from "./views/pages/AssignedBugsList";
import AllBugsList from "./views/pages/AllBugs";
import Abhishyandh from "./views/pages/Abhishyandh";

function App() {
  const { setprofileState } = useContext(AppContext);

  useEffect(() => {
    fetchMyProfileDetails();
  }, []);

  const fetchMyProfileDetails = async () => {
    const response = await getMyProfileServices();
    if (response.success) {
      setprofileState(response.data);
      return;
    }
    if (response.message === "jwt expired") {
      removeLocalStorageToken();
      removeLocalStorageRole();
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
         <Route path="/abhishyandh" element={<Abhishyandh/>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-profile"
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/employee-report/:employeeId"
            element={
              <ProtectedRoute roles={["manager"]}>
                <SingleEmployeeReport />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bug-graph"
            element={
              <ProtectedRoute>
                <BugReportGraph />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-bug"
            element={
              <ProtectedRoute>
                <CreateBug />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bugs/created"
            element={
              <ProtectedRoute>
                <CreatedBugsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bugs/assigned"
            element={
              <ProtectedRoute>
                <AssignedBugsList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bugs/all"
            element={
              <ProtectedRoute>
                <AllBugsList />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>

      <Toaster />
    </div>
  );
}

export default App;
