import React, {useEffect, useState} from 'react';
import {Drawer, TextField, Button, Divider, MenuItem, Typography, IconButton, Collapse} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { SketchPicker } from 'react-color';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectIsActorCreationDrawerOpen, setIsActorCreationDrawerOpen} from "./store/actorCreationDrawerSlice";
import {useGetModelsQuery} from "../../services/openai/openaiApi";
import {validTtsModels} from "../../api/tts/utils/apiClient";
import {useCreateActorMutation} from "../../services/server/serverApi";

const ActorCreationDrawer = () => {
    const theme = useTheme();
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [chatModel, setChatModel] = useState('');
    const [ttsModel, setTtsModel] = useState('');
    const [nameColor, setNameColor] = useState('#000000');
    const [contentsColor, setContentsColor] = useState('#000000');
    const [backgroundColor, setBackgroundColor] = useState('#FFFDD0'); // Cream white background
    const [borderColor, setBorderColor] = useState('#000000');
    const [avatar, setAvatar] = useState<string|File>('');
    const [prompt, setPrompt] = useState('');
    const [isMessageCardOpen, setIsMessageCardOpen] = useState(false);

    const { data: models } = useGetModelsQuery();

    const dispatch = useAppDispatch();
    const isDrawerOpen = useAppSelector(selectIsActorCreationDrawerOpen);

    const [createActor] = useCreateActorMutation();

    useEffect(() => {
        if (!models) { return; }

    }, [models]);

    const toggleMessageCard = () => {
        setIsMessageCardOpen((prevOpen) => !prevOpen);
    };

    const onDrawerClose = () => {
        dispatch(setIsActorCreationDrawerOpen(false));
    };

    const onFinish = async () => {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('title', title);
        formData.append('messageCard', JSON.stringify({
            nameColor,
            contentsColor,
            backgroundColor,
            borderColor
        }));
        formData.append('prompt', prompt);
        formData.append('avatar', avatar);
        formData.append('ttsModel', ttsModel);
        formData.append('chatModel', chatModel);

        const resp = await createActor(formData);
        debugger;

    };

    return (
        <Drawer anchor="right" open={isDrawerOpen} onClose={onDrawerClose}>
            <Box
                sx={{
                    width: 300,
                    p: 2,
                    backgroundColor: theme.palette.background.default,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                }}
            >
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Create New Actor
                    </Typography>

                    <TextField
                        fullWidth
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        margin="normal"
                    />

                    <TextField
                        select
                        fullWidth
                        label="Chat Model"
                        value={chatModel}
                        onChange={(e) => setChatModel(e.target.value)}
                        margin="normal"
                    >
                        {models && models.data.map((model) => (
                            <MenuItem key={`${model.id}-${model.created}`} value={model.id}>
                                {model.id}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        select
                        fullWidth
                        label="TTS Model"
                        value={ttsModel}
                        onChange={(e) => setTtsModel(e.target.value)}
                        margin="normal"
                    >
                        {Array.from(validTtsModels).map((model, idx) => {
                            return <MenuItem key={idx} value={model}>{model}</MenuItem>
                        })}
                    </TextField>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" gutterBottom>
                            Message Card
                        </Typography>
                        <IconButton onClick={toggleMessageCard}>
                            {isMessageCardOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                        </IconButton>
                    </Box>

                    <Collapse in={isMessageCardOpen}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">Name Color</Typography>
                            <SketchPicker color={nameColor} onChangeComplete={(color) => setNameColor(color.hex)} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">Contents Color</Typography>
                            <SketchPicker color={contentsColor} onChangeComplete={(color) => setContentsColor(color.hex)} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">Background Color</Typography>
                            <SketchPicker color={backgroundColor} onChangeComplete={(color) => setBackgroundColor(color.hex)} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">Border Color</Typography>
                            <SketchPicker color={borderColor} onChangeComplete={(color) => setBorderColor(color.hex)} />
                        </Box>
                    </Collapse>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2">Avatar</Typography>
                        <Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden onChange={(e) => setAvatar(e.target.files?.[0])} />
                        </Button>
                        {<Typography variant="body2">{avatar instanceof File ? avatar.name : ''}</Typography>}
                        <TextField
                            fullWidth
                            label="Or Paste Image URL"
                            value={avatar}
                            onChange={(e) => setAvatar(e.target.value)}
                            margin="normal"
                        />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <TextField
                        fullWidth
                        label="Prompt"
                        multiline
                        rows={4}
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        margin="normal"
                        sx={{ flexGrow: 1 }}
                    />

                    <Button variant="outlined" fullWidth onClick={() => {}}>
                        Advanced prompt mode
                    </Button>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Button variant="contained" color="secondary" onClick={onDrawerClose}>
                        Close
                    </Button>
                    <Button variant="contained" color="primary" onClick={onFinish}>
                        Finish
                    </Button>
                </Box>
            </Box>
        </Drawer>
    );
};

export default ActorCreationDrawer;