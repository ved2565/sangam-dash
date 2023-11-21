/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// ConsolidatedSchemeList.jsx
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
import { Eye, Pen, Trash } from "@phosphor-icons/react";

const ConsolidatedSchemeList = () => {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedScheme, setSelectedScheme] = useState("");
  const [editedScheme, setEditedScheme] = useState({});

  const SchemeDetailsModal = ({ schemeDetails, isOpen, onClose }) => {
    if (!schemeDetails) {
      return null;
    }
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
            {/* Add other scheme details here */}
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

  const SchemeEditModal = ({ schemeDetails, isOpen, onClose }) => {
    if (!schemeDetails) {
      return null;
    }
    return (
      <Modal isOpen={isOpen} onClose={handleCancelEdit}>
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
            <Button color="primary" onPress={handleSaveEdit}>
              Save Changes
            </Button>
            <Button color="danger" variant="light" onPress={handleCancelEdit}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
  };

  const handleView = (schemeDetails) => {
    console.log("View Scheme:", schemeDetails);
    setSelectedScheme(schemeDetails);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedScheme(null);
  };

  const handleEdit = (schemeId) => {
    console.log("Edit Scheme:", schemeId);
    setEditedScheme(schemeId);
    setEditOpen(true);
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `https://mehdb.vercel.app/updatescheme/${editedScheme._id}`,
        editedScheme
      );

      if (response.status === 200) {
        setSchemes((prevSchemes) =>
          prevSchemes.map((scheme) =>
            scheme._id === editedScheme._id ? editedScheme : scheme
          )
        );
        setEditOpen(false);
        console.log("Scheme edited successfully!");
      } else {
        console.log("Failed to edit scheme.");
      }
    } catch (error) {
      console.error("Error editing scheme:", error.message);
    }
  };

  const handleCancelEdit = () => {
    setEditOpen(false);
    setEditedScheme({});
  };

  const handleDelete = (schemeId) => {
    console.log("Delete Scheme:", schemeId);
    // Add your delete logic here
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://mehdb.vercel.app/getscheme");

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

    fetchData();
  }, []);

  return (
    <div className="border rounded-lg border-gray-600">
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
                    <Chip
                      onClick={() => handleDelete(scheme._id)}
                      color="danger"
                    >
                      <Trash size={20} weight="duotone" />
                    </Chip>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SchemeDetailsModal
        schemeDetails={selectedScheme}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
      <SchemeEditModal
        schemeDetails={editedScheme}
        isOpen={editOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};

export default ConsolidatedSchemeList;
