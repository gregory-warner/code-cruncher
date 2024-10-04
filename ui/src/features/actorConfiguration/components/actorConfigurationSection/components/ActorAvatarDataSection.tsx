import React, {ChangeEvent, useEffect, useState} from "react";
import {Avatar, Box, IconButton, Tooltip, Typography} from "@mui/material";
import {chatServerUrl} from "../../../../../../config";
import {Actor} from "../../../../../types";
import {useUpdateActorMutation, useUpdateAvatarMutation} from "../../../../../services/server/serverApi";

const ActorAvatarDataSection = ({ actor }: { actor: Actor }) => {
    const [updatedActor, setUpdatedActor] = useState<Actor>(actor);

    useEffect(() => {
        setUpdatedActor(actor);
    }, [actor]);

    const fileInput = React.useRef<HTMLInputElement>();

    const [updateAvatar] = useUpdateAvatarMutation();

    const onAvatarClick = () => {
        if (fileInput?.current) {
            fileInput.current.click();
        }
    };

    const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const formData: FormData = new FormData();
            formData.append('actorId', actor.actorId.toString());
            formData.append('avatar', event.target.files[0]);
            updateAvatar({
                actorId: actor.actorId,
                formData,
            });
        }
    };

    return (
        <Box display='flex' alignItems='center'>
            <Tooltip title="Change your avatar" placement="bottom">
                <IconButton>
                    <Avatar
                        onClick={onAvatarClick}
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
};

export default ActorAvatarDataSection;