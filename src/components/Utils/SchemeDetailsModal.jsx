import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from "@nextui-org/react";

const SchemeDetailsModal = ({ schemeDetails, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          {schemeDetails.schemename}
        </ModalHeader>
        <ModalBody>
          <p>{schemeDetails.desc}</p>
          <p>Ministry: {schemeDetails.ministry}</p>
          <p>Place: {schemeDetails.place}</p>
          <p>Time of Scheme Added: {schemeDetails.timeOfschemeAdded}</p>
          <p>Date: {schemeDetails.date}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SchemeDetailsModal;