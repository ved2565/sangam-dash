import React from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Button } from "@nextui-org/react";

const SchemeEditModal = ({ isOpen, onClose, editedScheme, onEdit, onCancelEdit }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader>Edit Scheme</ModalHeader>
        <ModalBody>
          <Input
            label="Scheme Name"
            value={editedScheme.schemename}
            onChange={(e) =>
              setEditedScheme({ ...editedScheme, schemename: e.target.value })
            }
          />
          <Input
            label="Ministry"
            value={editedScheme.ministry}
            onChange={(e) =>
              setEditedScheme({ ...editedScheme, ministry: e.target.value })
            }
          />
          <Input
            label="Description"
            value={editedScheme.desc}
            onChange={(e) =>
              setEditedScheme({ ...editedScheme, desc: e.target.value })
            }
          />
          <Input
            label="Place"
            value={editedScheme.place}
            onChange={(e) =>
              setEditedScheme({ ...editedScheme, place: e.target.value })
            }
          />
          {/* Add other input fields for editing scheme details */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onEdit}>
            Save Changes
          </Button>
          <Button color="danger" variant="light" onPress={onCancelEdit}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SchemeEditModal;