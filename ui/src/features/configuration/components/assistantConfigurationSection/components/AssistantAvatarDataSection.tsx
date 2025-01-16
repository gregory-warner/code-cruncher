import React, {ChangeEvent, useEffect, useState} from "react";
import {Avatar, Box, IconButton, Tooltip, Typography} from "@mui/material";
import {chatServerUrl} from "../../../../../../config";
import {EditableActor} from "../../../../../types";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectIsEditing, selectSelectedActor, setSelectedActor} from "../../../../assistant/assistantSlice";
import {isValidUrl} from "../../../../../utils/util";

const AssistantAvatarDataSection = () => {
    const dispatch = useAppDispatch();
    const actor: EditableActor = useAppSelector(selectSelectedActor);
    const isEditing = useAppSelector(selectIsEditing);

    const fileInput = React.useRef<HTMLInputElement>();

    useEffect(() => {
        return () => {
            if (isValidUrl(actor.avatar)) {
                URL.revokeObjectURL(actor.avatar);
            }
        };
    }, []);

    const onAvatarClick = () => {
        if (fileInput?.current) {
            fileInput.current.click();
        }
    };

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const updatedAvatar = URL.createObjectURL(event.target.files[0]);
            dispatch(setSelectedActor({
                ...actor,
                avatar: updatedAvatar,
            }));
        }
    };

    const avatar = isValidUrl(actor.avatar) ? actor.avatar : `${chatServerUrl}/images/${actor.avatar}`;

    if (isEditing) {
        return (
            <Box display='flex' alignItems='center'>
                <Tooltip title="Change your avatar" placement="bottom">
                    <IconButton onClick={onAvatarClick}>
                        <Avatar
                            alt={`${actor.name}'s avatar`}
                            src={avatar}
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
                    src={avatar}
                    sx={{ width: '100px', height: '100px' }}
                />
            <Typography variant='h5' component='div'>
                {actor.name}
            </Typography>
        </Box>
    );
};

export default AssistantAvatarDataSection;