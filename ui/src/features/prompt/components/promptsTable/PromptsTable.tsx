import React from "react";
import {Box, Table, TableContainer} from "@mui/material";
import PromptsTableHead from "./components/PromptsTableHead";
import {EditableActor} from "../../../../types";
import {useAppSelector} from "../../../../store/hooks";
import {selectSelectedActor} from "../../../assistant/assistantSlice";
import PromptsTableBody from "./components/PromptsTableBody";

const PromptsTable = () => {

    const actor: EditableActor|null = useAppSelector(selectSelectedActor)

    if (!actor) {
        return <Box></Box>;
    }

    return (
        <TableContainer>
            <Table>
                <PromptsTableHead />
                <PromptsTableBody />
            </Table>
        </TableContainer>
    );
};

export default PromptsTable;