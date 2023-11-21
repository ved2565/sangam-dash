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
} from "@nextui-org/react";
import { Eye, Pen, Trash } from "@phosphor-icons/react";

const ConsolidatedSchemeList = () => {
  const [schemes, setSchemes] = useState([]);
  const [error, setError] = useState(null);

  const handleView = (schemeDetails) => {
    console.log("View Scheme:", schemeDetails);
    // Add your view logic here
  };

  const handleEdit = (schemeName) => {
    console.log("Edit Scheme:", schemeName);
    // Add your edit logic here
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
      <Table border="primary">
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
                    <Chip onClick={() => handleEdit(scheme.schemename)} color="warning">
                      <Pen size={20} weight="duotone" />
                    </Chip>
                  </Tooltip>
                  <Tooltip content="Delete Scheme">
                    <Chip onClick={() => handleDelete(scheme._id)} color="danger">
                      <Trash size={20} weight="duotone" />
                    </Chip>
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

export default ConsolidatedSchemeList;
