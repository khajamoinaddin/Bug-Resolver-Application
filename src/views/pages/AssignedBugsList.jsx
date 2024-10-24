import React, { useState, useEffect } from "react";
import {
  getAssignedBugsToMeService,
  getCreatedBugsByMeService,
  updateBugStatusServices,
} from "../../services/bugs.api";
import MainLayout from "../layouts/MainLayout";
import { Table, Spinner, Button, Label, Select } from "flowbite-react";
import DetailBugModal from "../components/bugs/DetailBugModal";
import moment from "moment";
import toast from "react-hot-toast";

const statusColor = {
  pending: "text-red-500",
  inprogress: "text-yellow-500",
  completed: "text-green-500",
};

const AssignedBugsList = () => {
  const [bugs, setBugs] = useState(null);
  const [loading, setloading] = useState(false);
  const [openModal, setOpenModal] = useState({
    isOpen: false,
    details: null,
    selectedId: null,
    status: "",
  });

  useEffect(() => {
    fetchBugs();
  }, []);

  const fetchBugs = async () => {
    setloading(true);
    const response = await getAssignedBugsToMeService();
    if (response.success) {
      setBugs(response.data);
    }

    setloading(false);
  };

  const closeModelFunc = () =>
    setOpenModal({ ...openModal, isOpen: false, details: null });

  const changeStatusHandler = async (e, id) => {
    setOpenModal({ ...openModal, selectedId: id, status: e.target.value });
    const response = await updateBugStatusServices(id, {
      status: e.target.value,
    });
    if (response.success) {
      fetchBugs();
    } else {
      toast.error(response.message);
    }
  };

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
              <Table.HeadCell>Created By</Table.HeadCell>
              <Table.HeadCell>Status</Table.HeadCell>
              <Table.HeadCell>Details</Table.HeadCell>
              <Table.HeadCell>Update</Table.HeadCell>
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
                    <Table.Cell>{entry?.createdBy?.name}</Table.Cell>
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
                    <Table.Cell>
                      <Select
                        id="status"
                        name="Status"
                        value={
                          openModal?.selectedId === entry?._id
                            ? openModal.status
                            : entry?.status
                        }
                        onChange={(e) => changeStatusHandler(e, entry._id)}
                        required
                      >
                        <option value="" disabled>
                          Select Status
                        </option>
                        <option
                          value="pending"
                          selected={
                            openModal?.selectedId &&
                            openModal?.status === "pending"
                              ? true
                              : false
                          }
                        >
                          Pending
                        </option>
                        <option
                          value="inprogress"
                          selected={
                            openModal?.selectedId &&
                            openModal?.status === "inprogress"
                              ? true
                              : false
                          }
                        >
                          In progress
                        </option>
                        <option
                          value="completed"
                          selected={
                            (openModal?.selectedId && openModal?.status) ===
                            "completed"
                              ? true
                              : false
                          }
                        >
                          Completed
                        </option>
                      </Select>
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
                  <Label value="Created By" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {openModal?.details?.createdBy?.name}
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

export default AssignedBugsList;
