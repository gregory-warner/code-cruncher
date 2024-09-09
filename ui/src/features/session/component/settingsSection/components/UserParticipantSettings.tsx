import React from "react";
import {Box, TextField, Typography} from "@mui/material";
import {User} from "../../../../../types";

const UserParticipantSettings = ({ user }: {user: User}) => {

    // todo: score board

    return (
        <Box sx={{ width: '100%', pt: 2 }}>
            <Typography align='center'>{user.name}</Typography>
            <Box sx={{ p: 1 }}>
                <TextField label={'username'} disabled defaultValue={user.username} />
            </Box>
        </Box>
    );
};

export default UserParticipantSettings;