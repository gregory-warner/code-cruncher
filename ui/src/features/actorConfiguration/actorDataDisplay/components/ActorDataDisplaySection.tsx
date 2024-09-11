import React from "react";
import {Grid, IconButton, Typography} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import {ActorDisplayItem} from "../../types";

const ActorDataDisplaySection = ({items}: {items: ActorDisplayItem[]}) => {
    return (
        <Grid pt={1} container spacing={2} justifyContent='space-between' alignItems='flex-start'>
            <Grid item xs={11} container spacing={2}>
                {items.map((item, index) => (
                    <Grid item xs={4} display='flex' alignItems='center' key={`${item.label}-${index}`}>
                        <Typography variant='body2' mr={1}>{`${item.label}:`}</Typography>
                        <Typography variant='body1'>{item.value}</Typography>
                    </Grid>
                ))}
            </Grid>
            <IconButton>
                <EditIcon />
            </IconButton>
        </Grid>
    );
};

export default ActorDataDisplaySection;