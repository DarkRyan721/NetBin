import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";

export const DataTable = React.memo(({ data }) => {
  // Solo se renderiza cuando `data` cambia
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableHeaderCell>Owner</TableHeaderCell>
          <TableHeaderCell>Status</TableHeaderCell>
          <TableHeaderCell> Costs </TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {data_table.map((item) => (
          <TableRow key={item.workspace}>
            <TableCell>{item.owner}</TableCell>
            <TableCell>{item.status}</TableCell>
            <TableCell>{item.costs}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
});


