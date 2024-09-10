import React, {useState} from "react";
import {Avatar, Box, Divider, IconButton, TextField, Typography} from "@mui/material";
import {useAppSelector} from "../../../store/hooks";
import {selectSelectedActor} from "../store/actorConfigurationSlice";
import EditIcon from "@mui/icons-material/Edit";

const ActorDataDisplay = () => {
    const actor = useAppSelector(selectSelectedActor)

    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(actor?.title ?? '');

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    if (!actor) {
        return <Box></Box>;
    }

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box display="flex" alignItems="center" mb={2}>
                <Avatar src={actor.avatar} sx={{ mr: 2 }} />
                <Typography variant="h5" component="div">
                    {actor.name}
                </Typography>
            </Box>
            <Divider light sx={{ width: "100%", mb: 2 }} />
            <Box display="flex" alignItems="center" mb={2}>
                <Typography variant="subtitle1">Title:</Typography>
                {editingTitle ? (
                    <TextField size="small" value={title} onChange={handleTitleChange} />
                ) : (
                    <Typography variant="body1" sx={{ ml: 2 }}>
                        {actor.title}
                    </Typography>
                )}
                <IconButton onClick={() => setEditingTitle(!editingTitle)}>
                    <EditIcon />
                </IconButton>
            </Box>
        </Box>
    );

};

export default ActorDataDisplay;