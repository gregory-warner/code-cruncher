import React from "react";
import {TableCell, TableHead, TableRow} from "@mui/material";

const PromptsTableHead = () => {

    return (
        <TableHead>
            <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Prompt</TableCell>
                <TableCell>Postfix</TableCell>
                <TableCell>Created Date</TableCell>
                <TableCell>Deleted Date</TableCell>
            </TableRow>
        </TableHead>
    );
};

export default PromptsTableHead;