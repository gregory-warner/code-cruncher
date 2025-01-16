import React from "react";
import {Box, Divider, Grid, Tooltip, Typography} from "@mui/material";
import {ActorDisplayItem} from "../../../types";
import {useAppSelector} from "../../../../../store/hooks";
import {selectIsEditing} from "../../../../assistant/assistantSlice";

interface ActorDataDisplayProps {
    items: ActorDisplayItem[];
    title: string;
}

const AssistantDataSection = ({items, title = ''}: ActorDataDisplayProps) => {
    const isEditing = useAppSelector(selectIsEditing);

    return (
        <Box sx={{ width: '100%' }}>
            { title && <Divider textAlign='left'>{title}</Divider> }
            <Grid pt={1} pl={2} container spacing={2} justifyContent='space-between' alignItems='flex-start'>
                <Grid item xs={11} container spacing={2}>
                    {items.map((item, index) =>
                        isEditing && item.editComponent ? (
                            <Grid item xs={item.width ?? 4} display='flex' alignItems='center' key={`${item.label}-${index}`}>
                                <Typography variant='body2' mr={1}>{`${item.label}:`}</Typography>
                                {item.editComponent}
                            </Grid>
                        ) : (
                            <Grid item xs={item.width ?? 4} display='flex' alignItems='center' key={`${item.label}-${index}`}>
                                {item.helpText ? (
                                    <Tooltip title={<span style={{ fontSize: "12px" }}>{item.helpText}</span>}>
                                        <Typography variant='body2' mr={1}>{`${item.label}:`}</Typography>
                                    </Tooltip>
                                ) : (
                                    <Typography variant='body2' mr={1}>{`${item.label}:`}</Typography>
                                )}
                                <Typography variant='body1'>{item.value}</Typography>
                            </Grid>
                        )
                    )}
                </Grid>
            </Grid>
        </Box>
    );
};

export default AssistantDataSection;