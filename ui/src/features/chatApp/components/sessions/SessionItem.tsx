import React from "react";
import {Box, Grid, IconButton, Typography} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const SessionItem = ({sessionId}) => {
    return (
        <Box sx={{ width: '100%'}}>
            <Grid container alignItems='center'>
                <Grid item xs={1}>
                    <Typography variant='body1'>{'1.) '}</Typography>
                </Grid>
                <Grid item xs={7}>
                    <Typography variant='body1'>{'Untitled'}</Typography>
                </Grid>
                <Grid item xs={2}>
                    <IconButton aria-label="edit">
                        <EditIcon />
                    </IconButton>
                </Grid>
                <Grid item xs={2}>
                    <IconButton aria-label="edit">
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Box>
    )
};

export default SessionItem;