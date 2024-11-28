import React, {ChangeEvent, useState} from "react";
import {Avatar, Box, IconButton, Tooltip, Typography} from "@mui/material";
import {chatServerUrl} from "../../../../../../config";
import {EditableActor} from "../../../../../types";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectIsEditing, selectSelectedActor, setSelectedActor} from "../../../store/actorConfigurationSlice";

const ActorAvatarDataSection = () => {
    const dispatch = useAppDispatch();
    const actor: EditableActor = useAppSelector(selectSelectedActor);
    const isEditing = useAppSelector(selectIsEditing);

    const fileInput = React.useRef<HTMLInputElement>();

    const onAvatarClick = () => {
        if (fileInput?.current) {
            fileInput.current.click();
        }
    };

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            dispatch(setSelectedActor({
                ...actor,
                avatar: event.target.files[0],
            }));
        }
    };

    if (isEditing) {
        return (
            <Box display='flex' alignItems='center'>
                <Tooltip title="Change your avatar" placement="bottom">
                    <IconButton onClick={onAvatarClick}>
                        <Avatar
                            alt={`${actor.name}'s avatar`}
                            src={`${chatServerUrl}/images/${actor.avatar}`}
                            sx={{ width: '100px', height: '100px' }}
                        />
                    </IconButton>
                </Tooltip>
                <Typography variant='h5' component='div'>
                    {actor.name}
                </Typography>
                <input
                    ref={fileInput}
                    type='file'
                    style={{ display: 'none' }}
                    onChange={onFileChange}
                />
            </Box>
        );
    }

    return (
        <Box display='flex' alignItems='center'>
                <Avatar
                    alt={`${actor.name}'s avatar`}
                    src={`${chatServerUrl}/images/${actor.avatar}`}
                    sx={{ width: '100px', height: '100px' }}
                />
            <Typography variant='h5' component='div'>
                {actor.name}
            </Typography>
        </Box>
    );
};

export default ActorAvatarDataSection;