import {ActorDisplayItem} from '../../../types';
import ActorDataSection from './ActorDataSection';
import React, {useState} from 'react';
import {Actor} from '../../../../../types';
import {TextField} from "@mui/material";
import {useUpdateActorMutation} from "../../../../../services/server/serverApi";

const ActorGeneralDataSection = ({ actor }: {actor: Actor}) => {

    const [updatedActor, setUpdatedActor] = useState<Actor>(actor);

    const [updateActor] = useUpdateActorMutation();

    const onSave = () => {
        updateActor({
            actorId: actor.actorId,
            ...updatedActor,
        });
    };

    const items: ActorDisplayItem[] = [
        {
            label: 'Name',
            value: updatedActor.name,
            editComponent: (
                <TextField
                    defaultValue={updatedActor.name}
                    onChange={(event) => setUpdatedActor({ ...updatedActor, name: event.target.value })}
                />
            )
        },
        {
            label: 'Title',
            value: updatedActor.title,
            editComponent: (
                <TextField
                    defaultValue={updatedActor.title}
                    onChange={(event) => setUpdatedActor({ ...updatedActor, title: event.target.value })}
                />
            )
        },
    ];

    return (
        <ActorDataSection items={items} title='General' onSave={onSave} />
    );
};

export default ActorGeneralDataSection;