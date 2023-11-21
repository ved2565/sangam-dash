// SchemeListItem.js
import React from "react";
import { TableCell, TableRow, Tooltip, Chip } from "@nextui-org/react";
import { Eye, Pen, Trash } from "@phosphor-icons/react";

const SchemeListItem = ({ scheme, onView, onEdit, onDelete }) => {
  return (
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
            <Chip onClick={() => onView(scheme)} color="primary">
              <Eye size={20} weight="duotone" />
            </Chip>
          </Tooltip>
          <Tooltip content="Edit Scheme">
            <Chip onClick={() => onEdit(scheme.schemename)} color="warning">
              <Pen size={20} weight="duotone" />
            </Chip>
          </Tooltip>
          <Tooltip content="Delete Scheme">
            <Chip onClick={() => onDelete(scheme._id)} color="danger">
              <Trash size={20} weight="duotone" />
            </Chip>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SchemeListItem;