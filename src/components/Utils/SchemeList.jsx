import React, { useState, useEffect } from "react";
import axios from "axios";
import { Chip } from "@nextui-org/react";
import { PlusCircle } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { useDisclosure } from "@nextui-org/react";
import SchemeListTable from "./SchemeListTable";
import SchemeDetailsModal from "./SchemeDetailsModal";
import SchemeEditModal from "./SchemeEditModal";
import SchemeDeleteModal from "./SchemeDeleteModal";

const SchemeList = () => {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);
  const [editedScheme, setEditedScheme] = useState({});
  const { isOpen: isDetailsModalOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();
  const { isOpen: isDeleteModalOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();

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
    onDetailsOpen();
  };

  const handleEdit = async (schemeName) => {
    try {
      const response = await axios.get(`https://mehdb.vercel.app/getscheme/${schemeName}`);

      if (response.status === 200 && response.data.length > 0) {
        setEditedScheme(response.data[0]); // Assuming the API returns an array; take the first item
        onEditOpen();
      } else {
        console.log("Failed to fetch scheme details for editing.");
      }
    } catch (error) {
      console.error("Error fetching scheme details for editing:", error.message);
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
        onEditClose();
        console.log("Scheme edited successfully!");
      } else {
        console.log("Failed to edit scheme.");
      }
    } catch (error) {
      console.error("Error editing scheme:", error.message);
    }
  };

  const handleCancelEdit = () => {
    onEditClose();
  };

  const handleDelete = async (schemeId) => {
    try {
      const response = await axios.get(`https://mehdb.vercel.app/getscheme/${schemeId}`);

      if (response.status === 200) {
        setEditedScheme(response.data);
        onDeleteOpen();
      } else {
        console.log("Failed to fetch scheme details for deletion.");
      }
    } catch (error) {
      console.error("Error fetching scheme details for deletion:", error.message);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(`https://mehdb.vercel.app/deletescheme/${editedScheme._id}`);

      if (response.status === 200) {
        setSchemes((prevSchemes) =>
          prevSchemes.filter((scheme) => scheme._id !== editedScheme._id)
        );
        onDeleteClose();
        console.log("Scheme deleted successfully!");
      } else {
        console.log("Failed to delete scheme.");
      }
    } catch (error) {
      console.error("Error deleting scheme:", error.message);
    }
  };

  const handleCancelDelete = () => {
    onDeleteClose();
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
      <SchemeListTable
        schemes={schemes}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <SchemeDetailsModal
        schemeDetails={viewSchemeDetails}
        isOpen={isDetailsModalOpen}
        onClose={onDetailsClose}
      />
      <SchemeEditModal
        isOpen={isEditModalOpen}
        onClose={handleCancelEdit}
        editedScheme={editedScheme}
        onEdit={handleSaveEdit}
      />
      <SchemeDeleteModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
};

export default SchemeList;