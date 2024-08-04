import React from "react";
import {Box, Button, Grid, IconButton, Typography, useTheme} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDeleteDialogMutation} from "../../../services/server/serverApi";

const SessionItem = ({sessionId, session}) => {
    const theme = useTheme();

    const [deleteDialog] = useDeleteDialogMutation();

    const deleteSession = () => {
        deleteDialog(session.dialogId);
    };

    return (
        <Button
            sx={{
                width: '95%',
                textTransform: 'none',
                color: 'inherit', // Use inherited text color for dark mode and light mode
                '&:hover': { cursor: 'pointer' }, // Change cursor to pointer on hover
                '&:hover:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    outlineOffset: '-1px', // Prevents the border from cutting into the content
                    transition: 'border-color .3s, box-shadow .3s',
                    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                },
            }}
        >
            <Box sx={{ width: '100%' }}>
                <Grid container alignItems='center' sx={{paddingLeft: '10px'}}>
                    <Grid item xs={1}>
                        <Typography variant='body1'>{`${sessionId+1}.) `}</Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography variant='body1'>{session.dialogName}</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton aria-label="edit">
                            <EditIcon />
                        </IconButton>
                    </Grid>
                    <Grid item xs={2}>
                        <IconButton aria-label="delete" onClick={deleteSession}>
                            <DeleteIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </Box>
        </Button>
    )
};

export default SessionItem;