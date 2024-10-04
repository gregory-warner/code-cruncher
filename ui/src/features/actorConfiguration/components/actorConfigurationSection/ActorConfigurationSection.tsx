import React, {useState} from 'react';
import {Box} from '@mui/material';
import {useAppSelector} from '../../../../store/hooks';
import {selectSelectedActor} from '../../store/actorConfigurationSlice';
import {Actor} from "../../../../types";
import ActorModelDataSection from "./components/ActorModelDataSection";
import ActorGeneralDataSection from "./components/ActorGeneralDataSection";
import ActorAvatarDataSection from "./components/ActorAvatarDataSection";
import ActorPromptDataSection from "./components/ActorPromptDataSection";
import ActorColorThemeDataSection from "./components/ActorColorThemeDataSection";

const ActorConfigurationSection = () => {
    const actor: Actor|null = useAppSelector(selectSelectedActor)

    if (!actor) {
        return <Box></Box>;
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <ActorAvatarDataSection actor={{...actor}} />
            <ActorGeneralDataSection actor={{...actor}} />
            {actor?.aiModel && <ActorModelDataSection actor={{...actor}} />}
            <ActorColorThemeDataSection actor={{...actor}} />
            {actor.prompt && <ActorPromptDataSection actor={{...actor}} />}
        </Box>
    );
};

export default ActorConfigurationSection;