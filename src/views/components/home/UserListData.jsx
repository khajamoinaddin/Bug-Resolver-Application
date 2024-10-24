import React from "react";
import { Table, Pagination, Button } from "flowbite-react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const UserListData = ({
  data = null,
  totalPages,
  currentPage,
  onPageChange,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <Table.Head>
            <Table.HeadCell>S.NO</Table.HeadCell>
            <Table.HeadCell>email</Table.HeadCell>
            <Table.HeadCell>name</Table.HeadCell>
            <Table.HeadCell>phone</Table.HeadCell>
            <Table.HeadCell>role</Table.HeadCell>
            <Table.HeadCell>Report</Table.HeadCell>
            <Table.HeadCell>Details</Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {data?.map((entry, index) => (
              <React.Fragment key={entry._id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {index + 1}.
                  </Table.Cell>
                  <Table.Cell>{entry?.email}</Table.Cell>
                  <Table.Cell>{entry?.name}</Table.Cell>
                  <Table.Cell>{entry?.phone}</Table.Cell>
                  <Table.Cell>{entry?.role}</Table.Cell>
                  <Table.Cell>
                    {" "}
                    <Button
                      size="xs"
                      color="dark"
                      onClick={() => navigate(`/employee-report/${entry._id}`)}
                    >
                      View
                    </Button>
                  </Table.Cell>
                  <Table.Cell>
                    {" "}
                    <Button size="xs" color="success">
                      show
                    </Button>
                  </Table.Cell>
                </Table.Row>
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
      </div>

      <div className="flex overflow-x-auto sm:justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          showIcons
        />
      </div>
    </>
  );
};

export default UserListData;
