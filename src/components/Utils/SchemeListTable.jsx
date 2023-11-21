// SchemeListTable.js
import React from "react";
import { Table, TableHeader, TableColumn, TableBody } from "@nextui-org/react";
import SchemeListItem from "./SchemeListItem";

const SchemeListTable = ({ schemes, onView, onEdit, onDelete }) => {
  return (
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
          <SchemeListItem
            key={scheme._id}
            scheme={scheme}
            onView={onView}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default SchemeListTable;