import React from "react";
import {Prompt} from "../../../../../types";
import {TableCell, TableRow} from "@mui/material";

const PromptsTableRow = ({prompt}: {prompt: Prompt}) => {

    return (
        <TableRow>
            <TableCell component='th' scope='row'>{prompt.promptId}</TableCell>
            <TableCell component='th' scope='row'>{prompt.promptName}</TableCell>
            <TableCell component='th' scope='row'>{prompt.prompt}</TableCell>
            <TableCell component='th' scope='row'>{prompt.postfix}</TableCell>
            <TableCell component='th' scope='row'>{prompt.createdAt}</TableCell>
            <TableCell component='th' scope='row'>{prompt.deletedAt}</TableCell>
        </TableRow>
    );
};

export default PromptsTableRow;