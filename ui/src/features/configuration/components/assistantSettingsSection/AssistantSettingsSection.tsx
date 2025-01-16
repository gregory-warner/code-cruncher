import React from "react";
import {Button, Grid, Typography, useTheme} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import {
    useCloneActorMutation, useCreateActorMutation,
    useDeleteActorMutation,
    useUpdateActorMutation,
    useUpdateAvatarMutation
} from "../../../../services/server/serverApi";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {
    defaultActor,
    selectIsEditing,
    selectSelectedActor,
    setIsEditing,
    setSelectedActor
} from "../../../assistant/assistantSlice";
import {Actor} from "../../../../types";
import EditIcon from "@mui/icons-material/Edit";
import CancelIcon from '@mui/icons-material/Cancel';
import {fetchFileData, isValidUrl} from "../../../../utils/util";

const AssistantSettingsSection = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const isEditing = useAppSelector(selectIsEditing);
    const selectedActor = useAppSelector(selectSelectedActor);

    const [clone] = useCloneActorMutation();

    const [deleteActor] = useDeleteActorMutation();
    const [updateActor] = useUpdateActorMutation();
    const [updateAvatar] = useUpdateAvatarMutation();
    const [createActor] = useCreateActorMutation();

    const onNew = () => {
        dispatch(setSelectedActor(defaultActor));
        dispatch(setIsEditing(true));
    };

    const onSaveAvatar = async (actorId, avatar) => {
        const fileData = await fetchFileData(avatar);
        const file = new File([fileData], 'selected-avatar.png');
        const formData: FormData = new FormData();
        formData.append('actorId', actorId.toString());
        formData.append('avatar', file);
        updateAvatar({ actorId: selectedActor.actorId, formData });
    };

    const onSave = async () => {
        const actor = selectedActor.actorId > 0
            ? await updateActor(selectedActor).unwrap()
            : await createActor(selectedActor).unwrap();

        if (isValidUrl(selectedActor.avatar) && actor.actorId > 0) {
            await onSaveAvatar(actor.actorId, selectedActor.avatar);
        }

        dispatch(setIsEditing(false));
    };

    const onEdit = () => {
        const updatedEditMode =  !isEditing;

        dispatch(setIsEditing(updatedEditMode));

        if (!updatedEditMode && selectedActor.actorId === defaultActor.actorId) {
            dispatch(setSelectedActor(null));
        }
    };

    const onClone = async () => {
        const clonedActor = await clone(selectedActor as Actor).unwrap();
        if (clonedActor) {
            dispatch(setSelectedActor(clonedActor));
            dispatch(setIsEditing(true));
        }
    }

    const onDelete = async () => {
        await deleteActor(selectedActor.actorId);
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
                <Button
                    fullWidth
                    variant="outlined"
                    color="secondary"
                    startIcon={<AddIcon />}
                    disabled={isEditing}
                    onClick={onNew}
                >
                    New
                </Button>
            </Grid>
            <Grid container item xs={12} justifyContent="center" p={1} sx={{ color: theme.palette.secondary.main }}>
                <Button
                    fullWidth
                    variant="outlined"
                    color='inherit'
                    startIcon={<ContentCopyIcon />}
                    disabled={!selectedActor || isEditing}
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
                            disabled={!selectedActor}
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
                    disabled={!selectedActor || isEditing}
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

export default AssistantSettingsSection;