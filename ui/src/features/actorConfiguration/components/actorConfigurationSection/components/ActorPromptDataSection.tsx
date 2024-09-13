import {ActorDisplayItem} from '../../../types';
import ActorDataSection from './ActorDataSection';
import React, {useEffect, useState} from 'react';
import {Actor, Prompt} from '../../../../../types';
import {TextField} from "@mui/material";
import {useUpdatePromptMutation} from "../../../../../services/server/serverApi";

const ActorPromptDataSection = ({ actor }: {actor: Actor}) => {
    const [updatePrompt] = useUpdatePromptMutation();

    const [prompt, setPrompt] = useState<Prompt>(actor.prompt);

    useEffect(() => {
        setPrompt(actor.prompt);
    }, [actor]);

    const onSave = async () => {
        updatePrompt({
            actorId: parseInt(actor.actorId),
            prompt,
        });
    };

    const items: ActorDisplayItem[] = [
        {
            label: 'Name',
            value: prompt.promptName,
            width: 4,
            editComponent: (
                <TextField
                    defaultValue={prompt.promptName}
                    onChange={(event) => setPrompt({...prompt, promptName: event.target.value})}
                />
            )
        },
        {
            label: 'Postfix',
            helpText: 'This optional text will be applied at the end of every sent request.',
            value: prompt.postfix,
            width: 4,
            editComponent: (
                <TextField
                    defaultValue={prompt.postfix}
                    onChange={(event) => setPrompt({...prompt, postfix: event.target.value})}
                />
            )
        },
        {
            label: 'Prompt',
            value: prompt.prompt || 'none',
            width: 12,
            editComponent: (
                <TextField
                    fullWidth
                    multiline
                    maxRows={7}
                    minRows={3}
                    defaultValue={prompt.prompt}
                    onChange={(event) => setPrompt({...prompt, prompt: event.target.value})}
                />
            )
        },
    ];

    return (
        <ActorDataSection items={items} title='Prompt' onSave={onSave} />
    );
};

export default ActorPromptDataSection;