import React, { useState, useEffect, useContext } from "react";
import MainLayout from "../layouts/MainLayout";
import { getLocalStorageRole } from "../../helpers/localstorage";
import EmployeeData from "../components/home/EmployeeData";
import AppContext from "../../context/ContextWrapper";
import { Spinner } from "flowbite-react";
import { getEmployeeReportServices } from "../../services/employeereport.api";
import { getAllUsersServices } from "../../services/user.api";
import UserListData from "../components/home/UserListData";

const role = getLocalStorageRole();

const Home = () => {
  const {
    employeeActivityReport,
    setemployeeActivityReport,
    allUsers,
    setallUsers,
  } = useContext(AppContext);

  const [expandedRows, setExpandedRows] = useState([]);
  const [loading, setloading] = useState(false);
  const [usersPagination, setusersPagination] = useState({
    limitPerPage: 15,
    currentPage: 1,
    totalPages: 1,
  });

  // Function to toggle the expanded state of a row
  const toggleRow = (id) => {
    setExpandedRows((prevState) =>
      prevState.includes(id)
        ? prevState.filter((rowId) => rowId !== id)
        : [...prevState, id]
    );
  };

  useEffect(() => {
    if (role === "employee" && !employeeActivityReport) {
      fetchEmployeeReport();
    }
  }, []);

  useEffect(() => {
    if (role === "manager") {
      fetchUsersList();
    }
  }, [usersPagination?.currentPage]);

  const fetchEmployeeReport = async () => {
    setloading(true);
    const response = await getEmployeeReportServices();
    if (response?.success) {
      setemployeeActivityReport(response?.data || []);
    }
    setloading(false);
  };

  const fetchUsersList = async () => {
    setloading(true);
    const response = await getAllUsersServices(
      usersPagination?.limitPerPage,
      usersPagination?.currentPage
    );
    if (response?.success) {
      setallUsers(response?.data || []);
      const totalPages = Math.ceil(
        response?.totalDocuments / usersPagination?.limitPerPage
      );
      setusersPagination((prev) => ({ ...prev, totalPages }));
    }
    setloading(false);
  };

  const onPageChange = (pagenumber) => {
    setusersPagination((prev) => ({ ...prev, currentPage: pagenumber }));
  };

  return (
    <MainLayout>
      {loading ? (
        <div className="text-center w-full h-full flex justify-center items-center ">
          <Spinner size="xl" aria-label="Center-aligned spinner example" />
        </div>
      ) : (
        <>
          {role === "employee" && (
            <EmployeeData
              data={employeeActivityReport}
              toggleRow={toggleRow}
              expandedRows={expandedRows}
            />
          )}
          {role === "manager" && (
            <UserListData
              data={allUsers}
              totalPages={usersPagination?.totalPages}
              currentPage={usersPagination?.currentPage}
              onPageChange={onPageChange}
            />
          )}
        </>
      )}
    </MainLayout>
  );
};

export default Home;
