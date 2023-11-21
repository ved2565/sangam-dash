/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
  Chip,
} from "@nextui-org/react";
import axios from "axios";
import { Pen, Trash, Eye } from "@phosphor-icons/react";
import { Link, NavLink } from "react-router-dom";
import { PlusCircle } from "@phosphor-icons/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  useDisclosure,
} from "@nextui-org/react";

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

const SchemeEditModal = ({ schemeDetails, isOpen, onClose, onEdit }) => {
  const [editedScheme, setEditedScheme] = useState({ ...schemeDetails });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedScheme((prevScheme) => ({ ...prevScheme, [name]: value }));
  };

  const handleSaveEdit = () => {
    // Add logic to save edited scheme details
    onEdit(editedScheme);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Edit Scheme: {schemeDetails.schemename}
        </ModalHeader>
        <ModalBody>
          <Input
            label="Scheme Name"
            name="schemename"
            value={editedScheme.schemename}
            onChange={handleInputChange}
          />
          <Input
            label="Ministry"
            name="ministry"
            value={editedScheme.ministry}
            onChange={handleInputChange}
          />
          <Input
            label="Description"
            name="desc"
            value={editedScheme.desc}
            onChange={handleInputChange}
          />
          <Input
            label="Place"
            name="place"
            value={editedScheme.place}
            onChange={handleInputChange}
          />
          {/* Add other input fields for editing scheme details */}
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={handleSaveEdit}>
            Save Changes
          </Button>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const SchemeList = () => {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);
  const [editedScheme, setEditedScheme] = useState({});
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [viewSchemeDetails, setViewSchemeDetails] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://mehdb.vercel.app/getscheme");

        if (response.status === 200) {
          setSchemes(response.data);
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

  const handleView = (schemeDetails) => {
    setViewSchemeDetails(schemeDetails);
    onOpen();
  };

  const handleEdit = async (schemeName) => {
    try {
      const response = await axios.get(
        `https://mehdb.vercel.app/getscheme/${schemeName}`
      );

      if (response.status === 200 && response.data.length > 0) {
        setEditedScheme(response.data[0]); // Assuming the API returns an array; take the first item
        setIsEditModalOpen(true);
      } else {
        console.log("Failed to fetch scheme details for editing.");
      }
    } catch (error) {
      console.error(
        "Error fetching scheme details for editing:",
        error.message
      );
    }
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
        setIsEditModalOpen(false);
        console.log("Scheme edited successfully!");
      } else {
        console.log("Failed to edit scheme.");
      }
    } catch (error) {
      console.error("Error editing scheme:", error.message);
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = async (schemeId) => {
    try {
      const response = await axios.get(
        `https://mehdb.vercel.app/getscheme/${schemeId}`
      );

      if (response.status === 200) {
        setEditedScheme(response.data);
        setIsDeleteModalOpen(true);
      } else {
        console.log("Failed to fetch scheme details for deletion.");
      }
    } catch (error) {
      console.error(
        "Error fetching scheme details for deletion:",
        error.message
      );
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `https://mehdb.vercel.app/deletescheme/${editedScheme._id}`
      );

      if (response.status === 200) {
        setSchemes((prevSchemes) =>
          prevSchemes.filter((scheme) => scheme._id !== editedScheme._id)
        );
        setIsDeleteModalOpen(false);
        console.log("Scheme deleted successfully!");
      } else {
        console.log("Failed to delete scheme.");
      }
    } catch (error) {
      console.error("Error deleting scheme:", error.message);
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };

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
      <Table aria-label="Schemes table" border="primary">
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
                    <Chip
                      onClick={() => handleEdit(scheme.schemename)}
                      color="warning"
                    >
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

      {/* Render the SchemeDetailsModal component */}
      <SchemeDetailsModal
        schemeDetails={viewSchemeDetails}
        isOpen={isOpen}
        onClose={onClose}
      />

      {/* Edit Scheme Modal */}
      <Modal isOpen={isEditModalOpen} onClose={handleCancelEdit}>
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

      {/* Delete Scheme Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={handleCancelDelete}>
        <ModalContent>
          <ModalHeader>Confirm Deletion</ModalHeader>
          <ModalBody>
            <p>Are you sure you want to delete this scheme?</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={handleConfirmDelete}>
              Confirm Delete
            </Button>
            <Button color="primary" onPress={handleCancelDelete}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SchemeList;
