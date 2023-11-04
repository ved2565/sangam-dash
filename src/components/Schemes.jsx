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

  const handleEdit = (schemeId) => {
    // Add logic to handle editing scheme
    console.log("Edit Scheme:", schemeId);
  };

  const handleDelete = (schemeId) => {
    // Add logic to handle deleting scheme
    console.log("Delete Scheme:", schemeId);
  };

  return (
    <div className="w-[55%]">
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
                <div className="flex items-center space-x-2">
                  <Tooltip content="View Scheme">
                    <Button onClick={() => handleView(scheme._id)} variant="ghost">
                      View
                    </Button>
                  </Tooltip>
                  <Tooltip content="Edit Scheme">
                    <Button onClick={() => handleEdit(scheme._id)} variant="ghost">
                      Edit
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete Scheme">
                    <Button onClick={() => handleDelete(scheme._id)} variant="ghost" color="error">
                      Delete
                    </Button>
                  </Tooltip>
                  <Tooltip content="Delete Scheme">
                    <Button onClick={() => handleDelete(scheme._id)} variant="ghost" color="error">
                      Add
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
