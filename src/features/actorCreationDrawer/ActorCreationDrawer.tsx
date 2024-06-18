import React, {useEffect, useReducer, useState} from 'react';
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
import {setSnackbar} from "../../store/appSlice";
import {EditableActor} from "./types";

const initialState: EditableActor = {
    actorId: 0,
    name: '',
    configuration: {
        title: '',
        chatModel: '',
        ttsModel: '',
        colorTheme: {
            messageCard: {
                nameColor: '#000000',
                contentsColor: '#000000',
                backgroundColor: '#FFFDD0',
                borderColor: '#000000',
            },
        },
        avatar: '',
        prompt: '',
    }
};

type Action =
    | { type: 'initialize'; payload: EditableActor }
    | { type: 'updateName'; field: string, value: string }
    | { type: 'updateConfiguration'; field: string, value: string|File }
    | { type: 'updateMessageCard'; field: string, value: string }
    | { type: 'reset' };

const reducer = (state: EditableActor, action: Action): EditableActor => {
    switch (action.type) {
        case 'initialize':
            return { ...state, ...action.payload };
        case 'updateName':
            return { ...state, [action.field]: action.value };
        case 'updateConfiguration':
            return {
                ...state,
                configuration: {
                    ...state.configuration,
                    [action.field]: action.value,
                }
            };
        case 'updateMessageCard':
            return {
                ...state,
                configuration: {
                    ...state.configuration,
                    colorTheme: {
                        ...state.configuration.colorTheme,
                        messageCard: {
                            ...state.configuration.colorTheme.messageCard,
                            [action.field]: action.value,
                        },
                    },
                },
            };
        case 'reset':
            return initialState;
        default:
            return state;
    }
};

const ActorCreationDrawer: React.FC<{ actor: EditableActor | null }> = ({ actor }) => {
    const theme = useTheme();
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        if (actor) {
            dispatch({ type: 'initialize', payload: actor });
        }
    }, [actor]);

    const handleReset = () => {
        dispatch({ type: 'reset' });
    };

    const handleNameChange = (field: string, value: string) => {
        dispatch({ type: 'updateName', field, value });
    };

    const handleConfigurationChange = (field: string, value: string|File) => {
        dispatch({ type: 'updateConfiguration', field, value });
    }

    const handleMessageCardColorUpdate = (field: string, value: string) => {
        dispatch({ type: 'updateMessageCard', field, value });
    }

    const [isMessageCardOpen, setIsMessageCardOpen] = useState(false);

    const { data: models } = useGetModelsQuery();

    const appDispatch = useAppDispatch();
    const isDrawerOpen = useAppSelector(selectIsActorCreationDrawerOpen);

    const [createActor] = useCreateActorMutation();

    const toggleMessageCard = () => {
        setIsMessageCardOpen((prevOpen) => !prevOpen);
    };

    const onDrawerClose = () => {
        appDispatch(setIsActorCreationDrawerOpen(false));
        handleReset();
    };

    const onFinish = async () => {
        const formData = new FormData();
        const config = state.configuration;
        const cardColor = config.colorTheme.messageCard;

        formData.append('name', state.name);
        formData.append('title', config.title);
        formData.append('messageCard', JSON.stringify({ ...cardColor }));
        formData.append('prompt', config.prompt);
        formData.append('avatar', config.avatar);
        formData.append('ttsModel', config.ttsModel);
        formData.append('chatModel', config.chatModel);

        const response = await createActor(formData);
        if ('data' in response) {
            appDispatch(setSnackbar({ message: response.data.msg }))
            onDrawerClose();
        }
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
                        {state.actorId ? 'Create New Actor' : `Updating ${state.name}`}
                    </Typography>

                    <TextField
                        fullWidth
                        label="Name"
                        value={state.name}
                        onChange={(e) => handleNameChange('name', e.target.value)}
                        margin="normal"
                    />

                    <TextField
                        fullWidth
                        label="Title"
                        value={state.configuration.title}
                        onChange={(e) => handleConfigurationChange('title', e.target.value)}
                        margin="normal"
                    />

                    <TextField
                        select
                        fullWidth
                        label="Chat Model"
                        value={state.configuration.chatModel}
                        onChange={(e) => handleConfigurationChange('chatModel', e.target.value)}
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
                        value={state.configuration.ttsModel}
                        onChange={(e) => handleConfigurationChange('ttsModel', e.target.value)}
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
                            <SketchPicker color={state.configuration.colorTheme.messageCard.nameColor} onChangeComplete={(color) => handleMessageCardColorUpdate('nameColor', color.hex)} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">Contents Color</Typography>
                            <SketchPicker color={state.configuration.colorTheme.messageCard.contentsColor} onChangeComplete={(color) => handleMessageCardColorUpdate('contentsColor', color.hex)} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">Background Color</Typography>
                            <SketchPicker color={state.configuration.colorTheme.messageCard.backgroundColor} onChangeComplete={(color) => handleMessageCardColorUpdate('backgroundColor', color.hex)} />
                        </Box>

                        <Box sx={{ mb: 2 }}>
                            <Typography variant="body2">Border Color</Typography>
                            <SketchPicker color={state.configuration.colorTheme.messageCard.borderColor} onChangeComplete={(color) => handleMessageCardColorUpdate('borderColor', color.hex)} />
                        </Box>
                    </Collapse>

                    <Divider sx={{ my: 2 }} />

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="body2">Avatar</Typography>
                        <Button variant="contained" component="label">
                            Upload File
                            <input type="file" hidden onChange={(e) => handleConfigurationChange('avatar', e.target.files?.[0])} />
                        </Button>
                        {<Typography variant="body2">{state.configuration.avatar instanceof File ? state.configuration.avatar.name : ''}</Typography>}
                        <TextField
                            fullWidth
                            label="Or Paste Image URL"
                            value={state.configuration.avatar}
                            onChange={(e) => handleConfigurationChange('avatar', e.target.value)}
                            margin="normal"
                        />
                    </Box>

                    <Divider sx={{ my: 2 }} />

                    <TextField
                        fullWidth
                        label="Prompt"
                        multiline
                        rows={4}
                        value={state.configuration.prompt}
                        onChange={(e) => handleConfigurationChange('prompt', e.target.value)}
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