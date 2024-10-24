import React, { useState, useEffect } from "react";
import { getCreatedBugsByMeService } from "../../services/bugs.api";
import MainLayout from "../layouts/MainLayout";
import { Table, Spinner, Button, Label } from "flowbite-react";
import DetailBugModal from "../components/bugs/DetailBugModal";
import moment from "moment";

const statusColor = {
  pending: "text-red-500",
  inprogress: "text-yellow-500",
  completed: "text-green-500",
};

const CreatedBugsList = () => {
  const [bugs, setBugs] = useState(null);
  const [loading, setloading] = useState(false);
  const [openModal, setOpenModal] = useState({ isOpen: false, details: null });

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    setloading(true);
    const response = await getCreatedBugsByMeService();
    if (response.success) {
      setBugs(response.data);
    }

    setloading(false);
  };

  const closeModelFunc = () => setOpenModal({ isOpen: false, details: null });

  return (
    <div className="createbug">
    <MainLayout>
      {loading ? (
        <div className="text-center w-full h-full flex justify-center items-center ">
          <Spinner size="xl" aria-label="Center-aligned spinner example" />
        </div>
      ) : (
        <>
          <Table>
            <Table.Head>
              <Table.HeadCell>S.NO</Table.HeadCell>
              <Table.HeadCell>Title</Table.HeadCell>
              <Table.HeadCell>Component</Table.HeadCell>
              <Table.HeadCell>Priority</Table.HeadCell>
              <Table.HeadCell>Assigned To</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Details</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-y">
              {bugs?.map((entry, index) => (
                <React.Fragment key={entry._id}>
                  <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer">
                    <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {index + 1}.
                    </Table.Cell>
                    <Table.Cell>{entry?.title}</Table.Cell>
                    <Table.Cell>{entry?.component}</Table.Cell>
                    <Table.Cell>{entry?.priority}</Table.Cell>
                    <Table.Cell>{entry?.assignedTo?.name}</Table.Cell>
                    <Table.Cell className={statusColor[entry?.status]}>
                      {entry?.status}
                    </Table.Cell>
                    <Table.Cell>
                      <Button
                        size="xs"
                        color="success"
                        onClick={() =>
                          setOpenModal({
                            ...openModal,
                            isOpen: true,
                            details: entry,
                          })
                        }
                      >
                        Show
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                </React.Fragment>
              ))}
            </Table.Body>
          </Table>

          <DetailBugModal
            closeModel={closeModelFunc}
            openModal={openModal?.isOpen}
            data={openModal?.details}
          >
            <div className="space-y-4">
              <div className="flex">
                <div className="w-1/2">
                  <Label value="Title" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {openModal?.details?.title}
                  </p>
                </div>
                <div className="w-1/2">
                  <Label value="Component" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {openModal?.details?.component}
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2">
                  <Label value="Priority" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {openModal?.details?.priority}
                  </p>
                </div>

                <div className="w-1/2">
                  <Label value="Assigned To" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {openModal?.details?.assignedTo?.name}
                  </p>
                </div>
              </div>

              <div>
                <Label value="Status" />
                <p className="text-gray-700 dark:text-gray-300">
                  {openModal?.details?.status}
                </p>
              </div>

              <div>
                <Label value="Description" />
                <p className="text-gray-700 dark:text-gray-300">
                  {openModal?.details?.description}
                </p>
              </div>

              <div className="flex">
                <div className="w-1/2">
                  <Label value="Completed On" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {openModal?.details?.completedOn
                      ? openModal?.details?.createdAt &&
                        moment(openModal?.details?.completedOn).format("LLL")
                      : "-"}
                  </p>
                </div>
                <div className="w-1/2">
                  <Label value="Updated By" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {openModal?.updatedBy?.name}
                  </p>
                </div>
              </div>

              {openModal?.details?.image && (
                <div>
                  <img
                    className="h-auto max-w-full rounded-lg"
                    src={openModal?.details?.image?.url}
                    alt={openModal?.details?.image?.public_id}
                  />
                </div>
              )}

              <div>
                <Label value="Created At" />
                <p className="text-gray-700 dark:text-gray-300">
                  {openModal?.details?.createdAt &&
                    moment(openModal?.details?.createdAt).format("LLL")}
                </p>
              </div>
              <div>
                <Label value="Updated At" />
                <p className="text-gray-700 dark:text-gray-300">
                  {openModal?.details?.updatedAt &&
                    moment(openModal?.details?.updatedAt).format("LLL")}
                </p>
              </div>
            </div>
          </DetailBugModal>
        </>
      )}
    </MainLayout>
    </div>
  );
};

export default CreatedBugsList;
