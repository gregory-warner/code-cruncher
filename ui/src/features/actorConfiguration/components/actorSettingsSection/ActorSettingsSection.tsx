import React from "react";
import {Button, Grid, Typography, useTheme} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    useCloneActorMutation,
    useDeleteActorMutation,
    useUpdateActorMutation
} from "../../../../services/server/serverApi";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {
    selectIsEditing,
    selectSelectedActor,
    setIsEditing,
    setSelectedActor
} from "../../store/actorConfigurationSlice";
import {Actor} from "../../../../types";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from '@mui/icons-material/Cancel';

const ActorSettingsSection = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const isEditing = useAppSelector(selectIsEditing);
    const actor = useAppSelector(selectSelectedActor);

    const [clone] = useCloneActorMutation();

    const [deleteActor] = useDeleteActorMutation();

    const [updateActor] = useUpdateActorMutation();

    const onSave = () => {
        updateActor(actor);
        dispatch(setIsEditing(false));
    };

    const onEdit = () => {
        dispatch(setIsEditing(!isEditing));
    };

    const onClone = async () => {
        const clonedActor = await clone(actor as Actor).unwrap();
        if (clonedActor) {
            dispatch(setSelectedActor(clonedActor));
            dispatch(setIsEditing(true));
        }
    }

    const onDelete = async () => {
        await deleteActor(actor.actorId);
        dispatch(setSelectedActor(null));
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
                <Button
                    fullWidth
                    variant="outlined"
                    color='inherit'
                    startIcon={<ContentCopyIcon />}
                    disabled={!actor || isEditing}
                    onClick={onClone}
                >
                    Clone
                </Button>
            </Grid>
            <Grid container item xs={12} justifyContent="center" p={1} sx={{ color: theme.palette.secondary.main }}>
                {
                    isEditing ? (
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={onEdit}
                            startIcon={<CancelIcon />}
                        >
                            Cancel
                        </Button>
                    ) : (
                        <Button
                            disabled={!actor}
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={onEdit}
                            startIcon={<EditIcon />}
                        >
                            Edit
                        </Button>
                    )
                }
            </Grid>
            <Grid container item xs={12} justifyContent="center" p={1} sx={{ color: theme.palette.secondary.main }}>
                <Button
                    disabled={!isEditing}
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    onClick={onSave}
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
            </Grid>
            <Grid container item xs={12} justifyContent="center" p={1}>
                <Button
                    disabled={!actor || isEditing}
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={onDelete}
                >
                    Delete
                </Button>
            </Grid>
            <Grid container item xs={12}>
            </Grid>
        </Grid>
    );
};

export default ActorSettingsSection;