import {ActorDisplayItem} from '../../../types';
import ActorDataDisplaySection from './ActorDataDisplaySection';
import React, {useState} from 'react';
import {Prompt} from '../../../../../types';
import {TextField} from "@mui/material";

const ActorPromptDataSection = ({ prompt }: {prompt: Prompt}) => {

    const [actorPrompt, setActorPrompt] = useState<string>(prompt.prompt);

    const items: ActorDisplayItem[] = [
        {
            label: 'Prompt',
            value: actorPrompt || 'none',
            editComponent: <TextField defaultValue={actorPrompt} onChange={(event) => setActorPrompt(event.target.value)} />
        },
    ];

    return (
        <ActorDataDisplaySection items={items} title='Prompt' />
    );
};

export default ActorPromptDataSection;