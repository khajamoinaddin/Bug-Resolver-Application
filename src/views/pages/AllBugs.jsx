import React, { useState, useContext, useEffect } from "react";
import { Table, Pagination, Button, Spinner } from "flowbite-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/ContextWrapper";
import { getAllBugsServices } from "../../services/bugs.api";

const statusColor = {
  pending: "text-red-500",
  inprogress: "text-yellow-500",
  completed: "text-green-500",
};

const AllBugsList = () => {
  const { allBugs, setallBugs, other, setothers } = useContext(AppContext);
  const [bugsPagination, setbugsPagination] = useState({
    limitPerPage: 15,
    currentPage: 1,
    totalPages: 2,
    loading: false,
    initial: true,
  });

  useEffect(() => {
    if (!allBugs) {
      fetchBugsList();
    } else {
      setbugsPagination((prev) => ({ ...prev, initial: false }));
    }
  }, []);

  useEffect(() => {
    if (!bugsPagination.initial) {
      fetchBugsList();
    }
  }, [bugsPagination?.currentPage]);

  const fetchBugsList = async () => {
    if (bugsPagination.initial) {
      setbugsPagination((prev) => ({ ...prev, loading: true }));
    }
    const response = await getAllBugsServices(
      bugsPagination?.limitPerPage,
      bugsPagination?.currentPage
    );
    if (response?.success) {
      setallBugs(response?.data || []);
      const totalPages = Math.ceil(
        response?.totalDocuments / bugsPagination?.limitPerPage
      );
      setbugsPagination((prev) => ({
        ...prev,
        totalPages,
        loading: false,
        initial: false,
      }));
    } else {
      setbugsPagination((prev) => ({ ...prev, loading: false }));
    }
  };

  const onPageChange = (pagenumber) => {
    setbugsPagination((prev) => ({ ...prev, currentPage: pagenumber }));
  };

  return bugsPagination?.loading ? (
    <div className="text-center w-full h-full flex justify-center items-center ">
      <Spinner size="xl" aria-label="Center-aligned spinner example" />
    </div>
  ) : (
    <>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>S.NO</Table.HeadCell>
            <Table.HeadCell>Date</Table.HeadCell>
            <Table.HeadCell>Title</Table.HeadCell>
            <Table.HeadCell>Component</Table.HeadCell>
            <Table.HeadCell>Priority</Table.HeadCell>
            <Table.HeadCell>Description</Table.HeadCell>
            <Table.HeadCell>Creatd By</Table.HeadCell>
            <Table.HeadCell>Assigned To</Table.HeadCell>
            <Table.HeadCell>Status</Table.HeadCell>
            <Table.HeadCell>Completed On</Table.HeadCell>
            <Table.HeadCell>Updated By</Table.HeadCell>
            <Table.HeadCell>Image</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {allBugs?.map((entry, index) => (
              <React.Fragment key={entry._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}.
                  </Table.Cell>
                  <Table.Cell>
                    {moment(entry?.createdAt).format("LLL")}
                  </Table.Cell>
                  <Table.Cell>{entry?.title}</Table.Cell>
                  <Table.Cell>{entry?.component}</Table.Cell>
                  <Table.Cell>{entry?.priority}</Table.Cell>
                  <Table.Cell>{entry?.description}</Table.Cell>
                  <Table.Cell>{entry?.createdBy?.name}</Table.Cell>
                  <Table.Cell>{entry?.assignedTo?.name}</Table.Cell>
                  <Table.Cell className={statusColor[entry?.status]}>
                    {entry?.status}
                  </Table.Cell>
                  <Table.Cell>
                    {entry?.completedOn &&
                      moment(entry?.completedOn).format("LL")}
                  </Table.Cell>
                  <Table.Cell>{entry?.updatedBy?.name}</Table.Cell>
                  <Table.Cell>
                    {entry?.image?.url && (
                      <a
                        href={entry.image.url}
                        target="_blank"
                        className=" text-blue-500 underline"
                      >
                        view
                      </a>
                    )}
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={bugsPagination?.currentPage}
          totalPages={bugsPagination?.totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </>
  );
};

export default AllBugsList;
