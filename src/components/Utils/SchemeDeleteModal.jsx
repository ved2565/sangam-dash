import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const SchemeDeleteModal = ({ isOpen, onClose, onConfirmDelete, onCancelDelete }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Confirm Deletion</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this scheme?</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onConfirmDelete}>
            Confirm Delete
          </Button>
          <Button color="primary" onPress={onCancelDelete}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SchemeDeleteModal;