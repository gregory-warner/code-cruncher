import React, {useState} from "react";
import {Box, Divider, Grid, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {ActorDisplayItem} from "../../../types";

interface ActorDataDisplayProps {
    items: ActorDisplayItem[];
    title: string;
    // onSave: () => void;
}

const ActorDataSection = ({items, title}: ActorDataDisplayProps) => {
    const [isEdit, setIsEdit] = useState(false);

    return (
        <Box sx={{ width: '100%', pb: 2 }}>
            <Divider textAlign='left'>{title}</Divider>
            <Grid pt={1} container spacing={2} justifyContent='space-between' alignItems='flex-start'>
                <Grid item xs={11} container spacing={2}>
                    {items.map((item, index) =>
                        isEdit && item.editComponent ? (
                            <Grid item xs={item.width ?? 4} display='flex' alignItems='center' key={`${item.label}-${index}`}>
                                <Typography variant='body2' mr={1}>{`${item.label}:`}</Typography>
                                {item.editComponent}
                            </Grid>
                        ) : (
                            <Grid item xs={item.width ?? 4} display='flex' alignItems='center' key={`${item.label}-${index}`}>
                                <Typography variant='body2' mr={1}>{`${item.label}:`}</Typography>
                                <Typography variant='body1'>{item.value}</Typography>
                            </Grid>
                        )
                    )}
                </Grid>
                <IconButton onClick={() => setIsEdit(!isEdit)}>
                    <EditIcon />
                </IconButton>
            </Grid>
        </Box>
    );
};

export default ActorDataSection;