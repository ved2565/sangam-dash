/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Chip,
  Button,
  Input,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { Eye, Pen, PlusCircle, Trash } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";

const API_BASE_URL = "http://localhost:6969";

const ConsolidatedSchemeList = () => {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState({
    isOpen: false,
    schemeDetails: null,
    editMode: false,
    deleteMode: false,
  });
  const [editedScheme, setEditedScheme] = useState({});

  const fetchSchemes = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getschemes`);
      if (response.status === 200) {
        setSchemes(response.data || []);
      } else {
        setError("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
      setError("Internal server error");
    }
  };

  const handleView = (schemeDetails) => {
    console.log("View Scheme:", schemeDetails);
    setModalData({
      isOpen: true,
      schemeDetails,
    });
  };

  const handleEdit = (schemeDetails) => {
    console.log("Edit Scheme:", schemeDetails);
    setEditedScheme({ ...schemeDetails });
    setModalData({
      isOpen: true,
      schemeDetails,
      editMode: true,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/updatescheme/${editedScheme._id}`,
        editedScheme
      );

      if (response.status === 200) {
        setSchemes((prevSchemes) =>
          prevSchemes.map((scheme) =>
            scheme._id === editedScheme._id ? editedScheme : scheme
          )
        );
        setModalData({
          ...modalData,
          isOpen: false,
        });
        console.log("Scheme edited successfully!");
      } else {
        console.log("Failed to edit scheme.");
      }
    } catch (error) {
      console.error("Error editing scheme:", error.message);
    }
  };

  const handleDelete = (schemeDetails) => {
    console.log("Delete Scheme:", schemeDetails);
    setEditedScheme({ ...schemeDetails });
    setModalData({
      isOpen: true,
      schemeDetails,
      deleteMode: true,
    });
  };

  const handleConfirmDelete = async () => {
    console.log("Confirm Delete Scheme:", editedScheme._id);

    if (!editedScheme._id) {
      console.error("Invalid scheme ID for deletion");
      return;
    }

    try {
      const response = await axios.post(
        `${API_BASE_URL}/deletescheme/${editedScheme._id}`
      );

      if (response.status === 200) {
        setSchemes((prevSchemes) =>
          prevSchemes.filter((scheme) => scheme._id !== editedScheme._id)
        );
        setModalData({
          ...modalData,
          isOpen: false,
        });
        console.log("Scheme deleted successfully!");
      } else {
        console.log("Failed to delete scheme.");
      }
    } catch (error) {
      console.error("Error deleting scheme:", error.message);
    }
  };

  const handleCloseModal = () => {
    console.log("Close Modal");
    setModalData({
      isOpen: false,
      schemeDetails: null,
      editMode: false,
      deleteMode: false,
    });
    setEditedScheme({});
  };

  useEffect(() => {
    console.log("Fetch Schemes");
    fetchSchemes();
  }, []);

  return (
    <div className="border rounded-lg border-gray-600">
      <NavLink to="/addscheme" className="m-2 flex justify-end">
        <Chip
          variant="bordered"
          size="lg"
          color="primary"
          avatar={<PlusCircle size={20} weight="duotone" />}
        >
          <p>Add Scheme</p>
        </Chip>
      </NavLink>
      {error && <p>Error: {error}</p>}
      <Table border="primary" aria-label="Scheme Table">
        <TableHeader>
          <TableColumn>Sr. No.</TableColumn>
          <TableColumn>Scheme Name</TableColumn>
          <TableColumn>Ministry</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Place</TableColumn>
          <TableColumn>TOS Added</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {schemes.map((scheme) => (
            <TableRow key={scheme._id}>
              <TableCell>{scheme.srno}</TableCell>
              <TableCell>{scheme.schemename}</TableCell>
              <TableCell>{scheme.ministry}</TableCell>
              <TableCell>{scheme.desc}</TableCell>
              <TableCell>{scheme.place}</TableCell>
              <TableCell>{scheme.timeOfschemeAdded}</TableCell>
              <TableCell>{scheme.date}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Tooltip content="View Scheme">
                    <Chip onClick={() => handleView(scheme)} color="primary">
                      <Eye size={20} weight="duotone" />
                    </Chip>
                  </Tooltip>
                  <Tooltip content="Edit Scheme">
                    <Chip onClick={() => handleEdit(scheme)} color="warning">
                      <Pen size={20} weight="duotone" />
                    </Chip>
                  </Tooltip>
                  <Tooltip content="Delete Scheme">
                    <Chip onClick={() => handleDelete(scheme)} color="danger">
                      <Trash size={20} weight="duotone" />
                    </Chip>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SchemeModal
        modalData={modalData}
        editedScheme={editedScheme}
        onEdit={handleSaveEdit}
        onDelete={handleConfirmDelete}
        onClose={handleCloseModal}
        onInputChange={(field, value) =>
          setEditedScheme({ ...editedScheme, [field]: value })
        }
      />
    </div>
  );
};

const SchemeModal = ({
  modalData,
  editedScheme,
  onEdit,
  onDelete,
  onClose,
  onInputChange,
}) => {
  const { isOpen, schemeDetails, editMode, deleteMode } = modalData;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        {editMode && (
          <ModalHeader>Edit Scheme: {editedScheme.schemename}</ModalHeader>
        )}
        {deleteMode && <ModalHeader>Delete Scheme</ModalHeader>}
        <ModalBody>
          {schemeDetails && (
            <>
              <p>{schemeDetails.desc}</p>
              <p>Ministry: {schemeDetails.ministry}</p>
              <p>Place: {schemeDetails.place}</p>
              <p>Time of Scheme Added: {schemeDetails.timeOfschemeAdded}</p>
              <p>Date: {schemeDetails.date}</p>
            </>
          )}
          {editMode && (
            <>
              <Input
                label="Scheme Name"
                value={editedScheme.schemename}
                onChange={(e) => onInputChange("schemename", e.target.value)}
              />
              <Input
                label="Ministry"
                value={editedScheme.ministry}
                onChange={(e) => onInputChange("ministry", e.target.value)}
              />
              <Input
                label="Description"
                value={editedScheme.desc}
                onChange={(e) => onInputChange("desc", e.target.value)}
              />
              <Input
                label="Place"
                value={editedScheme.place}
                onChange={(e) => onInputChange("place", e.target.value)}
              />
              {/* Add other input fields for editing scheme details */}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          {editMode && (
            <>
              <Button color="primary" onPress={onEdit}>
                Save Changes
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
            </>
          )}
          {deleteMode && (
            <>
              <Button color="primary" onPress={onDelete}>
                Confirm Delete
              </Button>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConsolidatedSchemeList;
