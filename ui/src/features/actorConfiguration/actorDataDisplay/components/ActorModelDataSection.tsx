import {Box, Divider} from '@mui/material';
import {ActorDisplayItem} from '../../types';
import ActorDataDisplaySection from './ActorDataDisplaySection';
import React from 'react';
import {AIModel, ModelType} from '../../../../types';

const ActorModelDataSection = ({ model }: {model: AIModel}) => {

    const items: ActorDisplayItem[] = [
        { label: 'Name', value: model.modelName },
        { label: 'Mode', value: model.isLocal ? 'offline' : 'online' },
        { label: 'Type', value: ModelType[model.modelTypeId] },
        { label: 'Max Tokens', value: model.languageModel?.maxTokens },
        { label: 'Temperature', value: model.languageModel?.temperature },
        { label: 'Frequency Penalty', value: model.languageModel?.frequencyPenalty },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Divider textAlign='left'>AI Model</Divider>
            <ActorDataDisplaySection items={items} />
        </Box>
    );
};

export default ActorModelDataSection;