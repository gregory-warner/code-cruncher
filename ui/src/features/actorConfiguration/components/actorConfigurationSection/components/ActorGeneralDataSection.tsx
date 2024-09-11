import {ActorDisplayItem} from '../../../types';
import ActorDataSection from './ActorDataSection';
import React, {useState} from 'react';
import {Actor} from '../../../../../types';
import {TextField} from "@mui/material";

const ActorGeneralDataSection = ({ actor }: {actor: Actor}) => {

    const [name, setName] = useState<string>(actor.name);
    const [title, setTitle] = useState<string>(actor.title);

    const items: ActorDisplayItem[] = [
        {
            label: 'Name',
            value: actor.name,
            editComponent: <TextField defaultValue={name} onChange={(event) => setName(event.target.value)} />
        },
        {
            label: 'Title',
            value: actor.title,
            editComponent: <TextField defaultValue={title} onChange={(event) => setTitle(event.target.value)} />
        },
    ];

    return (
        <ActorDataSection items={items} title='General' />
    );
};

export default ActorGeneralDataSection;