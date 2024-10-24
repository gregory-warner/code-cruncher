import React from "react";
import {Button, Grid, Typography, useTheme} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {useUpdateActorMutation} from "../../../../services/server/serverApi";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {selectIsEditing, selectSelectedActor, setIsEditing} from "../../store/actorConfigurationSlice";

const ActorSettingsSection = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const isEditing = useAppSelector(selectIsEditing);
    const actor = useAppSelector(selectSelectedActor);

    const [updateActor] = useUpdateActorMutation();

    const onSave = () => {
        updateActor(actor);
        dispatch(setIsEditing(false));
    };

    const onEdit = () => {
        dispatch(setIsEditing(!isEditing));
    };

    return (
        <Grid container>
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={5} textAlign='left'>
                    <Typography variant='h6' sx={{paddingLeft: '10px', paddingRight: '5px'}}>
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
                {
                    isEditing ? (
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={onEdit}
                            startIcon={<ContentCopyIcon />}
                        >
                            Cancel
                        </Button>
                    ) : (
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={onEdit}
                            startIcon={<ContentCopyIcon />}
                        >
                            Edit
                        </Button>
                    )
                }
            </Grid>
            <Grid container item xs={12} justifyContent="center" p={1} sx={{ color: theme.palette.secondary.main }}>
                <Button disabled={!isEditing} fullWidth variant="outlined" color="secondary" onClick={onSave} startIcon={<SaveIcon />}>Save</Button>
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