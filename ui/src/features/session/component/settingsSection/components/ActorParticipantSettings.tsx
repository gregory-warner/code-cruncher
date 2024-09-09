import React from "react";
import {Box, TextField, Typography} from "@mui/material";
import {Actor} from "../../../../../types";

const ActorParticipantSettings = ({ actor }: {actor: Actor}) => {

    // todo: score board

    return (
        <Box sx={{ width: '100%', pt: 2 }}>
            <Typography align='center'>{actor.name}</Typography>
            <Box sx={{ p: 1 }}>
                <TextField label={'username'} disabled defaultValue={actor.username} />
            </Box>
            <Box sx={{ p: 1 }}>
                <TextField label={'model'} disabled defaultValue={actor.aiModel.modelName} />
            </Box>
            <Box sx={{ p: 1 }}>
                <TextField label={'type'} disabled defaultValue={actor.aiModel.isLocal ? 'offline' : 'online'} />
            </Box>
        </Box>
    );
};

export default ActorParticipantSettings;