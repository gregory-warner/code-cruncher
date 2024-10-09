import React from "react";
import {Button, Grid, Typography, useTheme} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {useUpdateActorMutation} from "../../../../services/server/serverApi";

const ActorSettingsSection = () => {
    const theme = useTheme();

    const [updateActor] = useUpdateActorMutation();

    // const onSave = () => {
    //     updateActor({
    //         actorId: actor.actorId,
    //         ...updatedActor,
    //     });
    // };

    return (
        <Grid container>
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={5} textAlign='center'>
                    <Typography variant='h6' sx={{paddingLeft: '5px', paddingRight: '5px'}}>
                        Actions
                    </Typography>
                </Grid>
            </Grid>
            <Grid container item xs={12} justifyContent="center" p={1} sx={{ color: theme.palette.secondary.main }}>
                <Button fullWidth variant="outlined" color="secondary" startIcon={<AddIcon />}>New</Button>
            </Grid>
            <Grid container item xs={12} justifyContent="center" p={1} sx={{ color: theme.palette.secondary.main }}>
                <Button fullWidth variant="outlined" color='inherit' startIcon={<ContentCopyIcon />}>Clone</Button>
            </Grid>
            <Grid container item xs={12} justifyContent="center" p={1} sx={{ color: theme.palette.secondary.main }}>
                <Button fullWidth variant="outlined" color="secondary" startIcon={<ContentCopyIcon />}>Edit</Button>
            </Grid>
            <Grid container item xs={12} justifyContent="center" p={1} sx={{ color: theme.palette.secondary.main }}>
                <Button fullWidth variant="outlined" color="secondary" startIcon={<SaveIcon />}>Save</Button>
            </Grid>
            <Grid container item xs={12} justifyContent="center" p={1} >
                <Button fullWidth variant="outlined" color="error" startIcon={<DeleteIcon />}>Delete</Button>
            </Grid>
            <Grid container item xs={12}>
            </Grid>
        </Grid>
    );
};

export default ActorSettingsSection;