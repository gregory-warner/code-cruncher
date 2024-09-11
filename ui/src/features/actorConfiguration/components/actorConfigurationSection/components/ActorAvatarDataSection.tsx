import React from "react";
import {Avatar, Box, IconButton, Tooltip, Typography} from "@mui/material";
import {chatServerUrl} from "../../../../../../config";
import {Actor} from "../../../../../types";

const ActorAvatarDataSection = ({ actor }: { actor: Actor }) => {

    const onAvatarClick = () => {

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
        </Box>
    );
};

export default ActorAvatarDataSection;