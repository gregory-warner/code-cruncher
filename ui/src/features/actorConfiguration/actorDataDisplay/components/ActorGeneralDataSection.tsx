import {Box, Divider} from '@mui/material';
import {ActorDisplayItem} from '../../types';
import ActorDataDisplaySection from './ActorDataDisplaySection';
import React from 'react';
import {Actor} from '../../../../types';

const ActorGeneralDataSection = ({ actor }: {actor: Actor}) => {

    const items: ActorDisplayItem[] = [
        { label: 'Name', value: actor.name },
        { label: 'Title', value:actor.title },
    ];

    return (
        <Box sx={{ width: '100%' }}>
            <Divider textAlign='left'>General</Divider>
            <ActorDataDisplaySection items={items} />
        </Box>
    );
};

export default ActorGeneralDataSection;