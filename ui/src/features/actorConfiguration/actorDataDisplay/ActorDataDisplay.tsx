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
import {Actor, ModelType} from "../../../types";
import ActorModelDataSection from "./components/ActorModelDataSection";
import ActorGeneralDataSection from "./components/ActorGeneralDataSection";
import ActorColorThemeSection from "../actorSettingsSection/components/ActorColorThemeSection";

const ActorDataDisplay = () => {
    const actor: Actor|null = useAppSelector(selectSelectedActor)

    const [editingTitle, setEditingTitle] = useState(false);
    const [title, setTitle] = useState(actor?.title ?? '');

    const [editingModel, setEditingModel] = useState(false);
    const [model, setModel] = useState(actor?.aiModel?.modelName ?? '');

    const colorTheme = actor?.colorTheme?.messageCard ?? {};

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
            <ActorGeneralDataSection actor={actor} />
            {actor?.aiModel && <ActorModelDataSection model={actor.aiModel} />}
        </Box>
    );

};

export default ActorDataDisplay;