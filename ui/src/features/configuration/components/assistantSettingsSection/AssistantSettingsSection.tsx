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
import ActionsSection from "../../../components/actionsSection/ActionsSection";
import ActionsSectionButton from "../../../components/actionsSection/ActionsSectionButton";

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

    const editButton = (
        isEditing ? (
            <ActionsSectionButton title={'Cancel'} startIcon={<CancelIcon />} onClick={onEdit} />
            ) : (
            <ActionsSectionButton title={'Edit'} startIcon={<EditIcon />} onClick={onEdit} disabled={!selectedActor} />
        )
    );

    return (
        <ActionsSection
            buttons={[
               <ActionsSectionButton title={'New'} startIcon={<AddIcon />} onClick={onNew} disabled={isEditing} />,
                <ActionsSectionButton title={'Clone'} startIcon={<ContentCopyIcon />} onClick={onClone} disabled={!selectedActor || isEditing} />,
                editButton,
                <ActionsSectionButton title={'Save'} startIcon={<SaveIcon />} onClick={onSave} disabled={!isEditing} />,
                <ActionsSectionButton title={'Delete'} startIcon={<DeleteIcon />} onClick={onDelete} disabled={!selectedActor || isEditing} />,
            ]}
        />
    );
};

export default AssistantSettingsSection;