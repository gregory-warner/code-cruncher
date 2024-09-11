import {ActorDisplayItem} from '../../../types';
import ActorDataSection from './ActorDataSection';
import React, {useState} from 'react';
import {Actor, Prompt} from '../../../../../types';
import {TextField} from "@mui/material";
import {useAppSelector} from "../../../../../store/hooks";
import {selectSelectedActor} from "../../../store/actorConfigurationSlice";
import {useUpdatePromptMutation} from "../../../../../services/server/serverApi";

const ActorPromptDataSection = () => {
    const actor: Actor|null = useAppSelector(selectSelectedActor)

    const prompt = actor.prompt;

    const [updatePrompt] = useUpdatePromptMutation();

    const [actorPrompt, setActorPrompt] = useState<string>(prompt.prompt);

    const onSave = async () => {
        setActorPrompt(actorPrompt);
        const response = await updatePrompt({
            actorId: parseInt(actor.actorId),
            prompt: {
                prompt: actorPrompt,
            },
        });
    }

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
        <ActorDataSection items={items} title='Prompt' onSave={onSave} />
    );
};

export default ActorPromptDataSection;