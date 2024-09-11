import {ActorDisplayItem} from '../../../types';
import ActorDataSection from './ActorDataSection';
import React from 'react';
import {AIModel, ModelType} from '../../../../../types';
import {TextField, Typography} from "@mui/material";
import ModelSelect from "../../ModelSelect";

const ActorModelDataSection = ({ model }: {model: AIModel}) => {

    const [name, setName] = React.useState<string>(model.modelName);
    const [maxTokens, setMaxTokens] = React.useState<string>(model.languageModel?.maxTokens);
    const [temperature, setTemperature] = React.useState<string>(model.languageModel?.temperature);
    const [freqPenalty, setFreqPenalty] = React.useState<string>(model.languageModel?.frequencyPenalty);


    const items: ActorDisplayItem[] = [
        {
            label: 'Name',
            value: name,
            editComponent: <ModelSelect selectedModel={name} handleModelChange={(event) => setName(event.target.value)} />
        },
        {
            label: 'Mode',
            value: model.isLocal ? 'offline' : 'online',
            editComponent: <Typography>--</Typography>
        },
        {
            label: 'Type',
            value: ModelType[model.modelTypeId],
            editComponent: <Typography>--</Typography>
        },
        {
            label: 'Max Tokens',
            value: maxTokens,
            editComponent: <TextField defaultValue={maxTokens} onChange={(event) => setMaxTokens(event.target.value)} />
        },
        {
            label: 'Temperature',
            value: temperature,
            editComponent: <TextField defaultValue={temperature} onChange={(event) => setTemperature(event.target.value)} />
        },
        {
            label: 'Frequency Penalty',
            value: freqPenalty,
            editComponent: <TextField defaultValue={freqPenalty} onChange={(event) => setFreqPenalty(event.target.value)} />
        },
    ];

    return (
        <ActorDataSection items={items} title='AI Model' />
    );
};

export default ActorModelDataSection;