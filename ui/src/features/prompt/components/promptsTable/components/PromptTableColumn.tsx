import React from "react";
import {TableCell} from "@mui/material";

const PromptTableColumn = ({ text }: { text: string|number }) => {
    return (
        <TableCell
            component='th'
            scope='row'
            sx={{ whiteSpace: 'pre-wrap', verticalAlign: 'top' }}
        >
            {text}
        </TableCell>

    )
};

export default PromptTableColumn;