import React, {useState} from 'react';
import {Box} from '@mui/material';
import {useAppSelector} from '../../../../store/hooks';
import {selectSelectedActor} from '../../store/actorConfigurationSlice';
import {Actor} from "../../../../types";
import ActorModelDataSection from "./components/ActorModelDataSection";
import ActorGeneralDataSection from "./components/ActorGeneralDataSection";
import ActorAvatarDataSection from "./components/ActorAvatarDataSection";
import ActorPromptDataSection from "./components/ActorPromptDataSection";

const ActorConfigurationSection = () => {
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

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <ActorAvatarDataSection actor={actor} />
            <ActorGeneralDataSection actor={actor} />
            {actor?.aiModel && <ActorModelDataSection model={actor.aiModel} />}
            {actor.prompt && <ActorPromptDataSection prompt={actor.prompt} />}
        </Box>
    );
};

export default ActorConfigurationSection;