import React, { useState, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Button,
} from "@nextui-org/react";
import axios from "axios";
import { Pen } from "@phosphor-icons/react";
import { Trash } from "@phosphor-icons/react";
import { Eye } from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { PlusCircle } from "@phosphor-icons/react";

const SchemeList = () => {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);

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
  }, []); // Empty dependency array ensures this runs only once on component mount

  const handleView = (schemeId) => {
    // Add logic to handle viewing details
    console.log("View Scheme:", schemeId);
  };

  const handleEdit = async (schemeId) => {
    try {
      const response = await axios.get(`https://mehdb.vercel.app/getscheme/${schemeId}`);

      if (response.status === 200) {
        setEditingScheme(response.data);
        setIsEditModalOpen(true);
      } else {
        console.log("Failed to fetch scheme details for editing.");
      }
    } catch (error) {
      console.error("Error fetching scheme details for editing:", error.message);
    }
  };

  // Function to handle save edit button click
  const handleSaveEdit = async () => {
    try {
      const response = await axios.put(
        `https://mehdb.vercel.app/updatescheme/${editingScheme._id}`,
        editingScheme
      );

      if (response.status === 200) {
        setSchemes((prevSchemes) =>
          prevSchemes.map((scheme) =>
            scheme._id === editingScheme._id ? editingScheme : scheme
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

  // Function to handle cancel edit button click
  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const handleDelete = async (schemeId) => {
    try {
      const response = await axios.get(
        `https://mehdb.vercel.app/deletescheme/${schemeId}`
      );

      if (response.status === 200) {
        // Remove the deleted scheme from the local state
        setSchemes((prevSchemes) =>
          prevSchemes.filter((scheme) => scheme._id !== schemeId)
        );
        console.log("Scheme deleted successfully!");
      } else {
        console.log("Failed to delete scheme.");
      }
    } catch (error) {
      console.error("Error deleting scheme:", error.message);
    }
  };

  return (
    <div className="">
      <NavLink to="/addscheme" className="my-2 flex justify-end">
        <Button className="mb-4">
          <PlusCircle size={24} weight="duotone" />
          <p>Add Scheme</p>
        </Button>
      </NavLink>
      {error && <p>Error: {error}</p>}
      <Table aria-label="Schemes table">
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
                <div className="flex items-center">
                  <Tooltip content="View Scheme">
                    <Button
                      onClick={() => handleView(scheme._id)}
                      variant="ghost"
                      className="min-w-[40px]"
                    >
                      <Eye size={24} weight="duotone" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Edit Scheme">
                    <Button
                      onClick={() => handleEdit(scheme._id)}
                      variant="ghost"
                      className="min-w-[40px]"
                    >
                      <Pen size={24} weight="duotone" />
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete Scheme">
                    <Button
                      onClick={() => handleDelete(scheme._id)}
                      variant="ghost"
                      color="danger"
                      className="min-w-[40px]"
                    >
                      <Trash size={24} weight="duotone" />
                    </Button>
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default SchemeList;
