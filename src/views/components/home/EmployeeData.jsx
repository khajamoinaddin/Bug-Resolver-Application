import React from "react";
import { Table } from "flowbite-react";
import moment from "moment";

const EmployeeData = ({ data = null, toggleRow, expandedRows }) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <Table.Head>
          <Table.HeadCell>S.NO</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Sessions</Table.HeadCell>
          <Table.HeadCell>Created AT</Table.HeadCell>
          <Table.HeadCell>Updated AT</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data?.map((entry, index) => (
            <React.Fragment key={entry._id}>
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
                onClick={() => toggleRow(entry._id)}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {index + 1}
                </Table.Cell>
                <Table.Cell>
                  {moment(entry.date).format("DD MMM YYYY")}
                </Table.Cell>
                <Table.Cell>
                  {expandedRows.includes(entry._id)
                    ? "Hide Sessions"
                    : "Show Sessions"}
                </Table.Cell>
                <Table.Cell>
                  {moment(entry.createdAt).format("DD MMM YYYY")}
                </Table.Cell>
                <Table.Cell>
                  {moment(entry.updatedAt).format("DD MMM YYYY")}
                </Table.Cell>
              </Table.Row>
              {expandedRows.includes(entry._id) && (
                <Table.Row className="bg-gray-50 dark:bg-gray-900">
                  <Table.Cell colSpan="3">
                    <div className="p-4">
                      <Table>
                        <Table.Head>
                          <Table.HeadCell>Login Time</Table.HeadCell>
                          <Table.HeadCell>Logout Time</Table.HeadCell>
                          <Table.HeadCell>Time Difference (hrs)</Table.HeadCell>
                        </Table.Head>
                        <Table.Body className="divide-y">
                          {entry.sessions.map((session) => (
                            <Table.Row key={session._id}>
                              <Table.Cell>
                                {session.login.timeFormat}
                              </Table.Cell>
                              <Table.Cell>
                                {session.logout
                                  ? session.logout.timeFormat
                                  : "N/A"}
                              </Table.Cell>
                              <Table.Cell>
                                {session.timeDifference !== undefined
                                  ? session.timeDifference
                                  : "N/A"}
                              </Table.Cell>
                            </Table.Row>
                          ))}
                        </Table.Body>
                      </Table>
                    </div>
                  </Table.Cell>
                </Table.Row>
              )}
            </React.Fragment>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default EmployeeData;
