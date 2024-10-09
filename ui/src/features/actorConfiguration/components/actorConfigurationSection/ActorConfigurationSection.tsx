import React from 'react';
import {Box} from '@mui/material';
import {useAppSelector} from '../../../../store/hooks';
import {selectSelectedActor} from '../../store/actorConfigurationSlice';
import {EditableActor} from "../../../../types";
import ActorModelDataSection from "./components/ActorModelDataSection";
import ActorGeneralDataSection from "./components/ActorGeneralDataSection";
import ActorAvatarDataSection from "./components/ActorAvatarDataSection";
import ActorPromptDataSection from "./components/ActorPromptDataSection";
import ActorColorThemeDataSection from "./components/ActorColorThemeDataSection";

const ActorConfigurationSection = () => {
    const actor: EditableActor|null = useAppSelector(selectSelectedActor)

    if (!actor) {
        return <Box></Box>;
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <ActorAvatarDataSection />
            <ActorGeneralDataSection />
            <ActorModelDataSection />
            <ActorColorThemeDataSection />
            <ActorPromptDataSection />
        </Box>
    );
};

export default ActorConfigurationSection;