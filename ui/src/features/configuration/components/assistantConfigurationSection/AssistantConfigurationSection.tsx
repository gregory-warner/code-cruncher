import React from 'react';
import {Box} from '@mui/material';
import {useAppSelector} from '../../../../store/hooks';
import {selectSelectedActor} from '../../../assistant/assistantSlice';
import {EditableActor} from "../../../../types";
import AssistantModelDataSection from "./components/AssistantModelDataSection";
import AssistantGeneralDataSection from "./components/AssistantGeneralDataSection";
import AssistantAvatarDataSection from "./components/AssistantAvatarDataSection";
import AssistantPromptDataSection from "./components/AssistantPromptDataSection";
import AssistantColorThemeDataSection from "./components/AssistantColorThemeDataSection";

const AssistantConfigurationSection = () => {
    const actor: EditableActor|null = useAppSelector(selectSelectedActor)

    if (!actor) {
        return <Box></Box>;
    }

    return (
        <Box display='flex' flexDirection='column' alignItems='center'>
            <AssistantAvatarDataSection />
            <AssistantGeneralDataSection />
            <AssistantModelDataSection />
            <AssistantColorThemeDataSection />
            <AssistantPromptDataSection />
        </Box>
    );
};

export default AssistantConfigurationSection;