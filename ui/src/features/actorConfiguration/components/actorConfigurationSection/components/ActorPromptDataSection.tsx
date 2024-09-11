import {ActorDisplayItem} from '../../../types';
import ActorDataSection from './ActorDataSection';
import React, {useState} from 'react';
import {Prompt} from '../../../../../types';
import {TextField} from "@mui/material";

const ActorPromptDataSection = ({ prompt }: {prompt: Prompt}) => {

    const [actorPrompt, setActorPrompt] = useState<string>(prompt.prompt);

    const items: ActorDisplayItem[] = [
        {
            label: 'Prompt',
            value: actorPrompt || 'none',
            width: 12,
            editComponent: (
                <TextField
                    fullWidth
                    multiline
                    maxRows={7}
                    minRows={3}
                    defaultValue={actorPrompt}
                    onChange={(event) => setActorPrompt(event.target.value)}
                />
            )
        },
    ];

    return (
        <ActorDataSection items={items} title='Prompt' />
    );
};

export default ActorPromptDataSection;