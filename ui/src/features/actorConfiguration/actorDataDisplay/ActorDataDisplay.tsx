import React, {useState} from 'react';
import {
    Avatar,
    Box,
    Divider,
    Grid,
    IconButton,
    TextField,
    Tooltip,
    Typography
} from '@mui/material';
import {useAppSelector} from '../../../store/hooks';
import {selectSelectedActor} from '../store/actorConfigurationSlice';
import EditIcon from '@mui/icons-material/Edit';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {chatServerUrl} from '../../../../config';
import {ModelType} from "../../../types";

const ActorDataDisplay = () => {
    const actor: Actor|null = useAppSelector(selectSelectedActor)

    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(actor?.title ?? '');

    const [editingModel, setEditingModel] = useState(false);
    const [model, setModel] = useState(actor?.aiModel?.modelName ?? '');


    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    if (!actor) {
        return <Box></Box>;
    }

    const onAvatarClick = () => {

    };

    // todo: set sections editable

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <Box display='flex' alignItems='center' mb={2}>
                <IconButton>
                    <Avatar
                        onClick={onAvatarClick}
                        alt={`${actor.name}'s avatar`}
                        src={`${chatServerUrl}/images/${actor.avatar}`}
                        sx={{ width: '100px', height: '100px' }}
                    />
                </IconButton>
                <Typography variant='h5' component='div'>
                    {actor.name}
                </Typography>
            </Box>
            <Divider sx={{ width: '100%' }} orientation='horizontal' textAlign='left'>General</Divider>
            <Box display='flex' alignItems='center' mb={2}>
                <IconButton onClick={() => setEditingTitle(!editingTitle)}>
                    <EditIcon />
                </IconButton>
                <Typography variant='subtitle1'>Title:</Typography>
                {editingTitle ? (
                    <TextField size='small' value={title} onChange={handleTitleChange} />
                ) : (
                    <Typography variant='body1' sx={{ ml: 2 }}>
                        {actor.title}
                    </Typography>
                )}
            </Box>
            <Box sx={{ width: '100%' }}>
                <Divider textAlign='left'>AI Model</Divider>
                <Grid container>
                    <Grid container spacing={2}>
                        <Grid item xs={4} display='flex' alignItems='center'>
                            <Typography variant='body2' mr={1}>Name:</Typography>
                            <Typography variant='body1'>{actor.aiModel.modelName}</Typography>
                            {actor.aiModel.isLocal ? (
                                <Tooltip title='This model is offline'>
                                    <FiberManualRecordIcon sx={{ color: 'green', ml: 1 }} />
                                </Tooltip>
                            ) : (
                                <Tooltip title='This model is online'>
                                    <FiberManualRecordIcon sx={{ color: 'yellow', ml: 1 }} />
                                </Tooltip>
                            )}
                        </Grid>
                        <Grid item xs={4} display='flex' alignItems='center'>
                            <Typography variant='body2' mr={1}>Type:</Typography>
                            <Typography variant='body1'>{ModelType[actor.aiModel.modelTypeId]}</Typography>
                        </Grid>
                        <Grid item xs={4} display='flex' justifyContent='flex-end'>
                            <IconButton>
                                <EditIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={4} display='flex' alignItems='center'>
                            <Typography variant='body2' mr={1}>Max Tokens:</Typography>
                            <Typography variant='body1'>{actor.aiModel.languageModel?.maxTokens}</Typography>
                        </Grid>
                        <Grid item xs={4} display='flex' alignItems='center'>
                            <Typography variant='body2' mr={1}>Temperature:</Typography>
                            <Typography variant='body1'>{actor.aiModel.languageModel?.temperature}</Typography>
                        </Grid>
                        <Grid item xs={4} display='flex' alignItems='center'>
                            <Typography variant='body2' mr={1}>Frequency Penalty:</Typography>
                            <Typography variant='body1'>{actor.aiModel.languageModel?.frequencyPenalty}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );

};

export default ActorDataDisplay;