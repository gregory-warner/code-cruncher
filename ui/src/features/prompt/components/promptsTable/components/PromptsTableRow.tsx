import React from "react";
import {Prompt} from "../../../../../types";
import {TableRow} from "@mui/material";
import {getFormattedDate} from "../../../util";
import PromptTableColumn from "./PromptTableColumn";

const PromptsTableRow = ({prompt}: {prompt: Prompt}) => {

    return (
        <TableRow>
            <PromptTableColumn text={prompt.promptId} />
            <PromptTableColumn text={prompt.promptName} />
            <PromptTableColumn text={prompt.prompt} />
            <PromptTableColumn text={getFormattedDate(prompt.createdAt)} />
            <PromptTableColumn text={getFormattedDate(prompt.deletedAt)} />
        </TableRow>
    );
};

export default PromptsTableRow;