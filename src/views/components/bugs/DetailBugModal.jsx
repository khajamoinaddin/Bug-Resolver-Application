import React from "react";
import { Button, Modal } from "flowbite-react";

const DetailBugModal = ({ openModal, closeModel, title, children }) => {
  return (
    <Modal show={openModal} onClose={closeModel}>
      <Modal.Header>{title || "Bug Details"}</Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button color="gray" onClick={closeModel}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetailBugModal;
