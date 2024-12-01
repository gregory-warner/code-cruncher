import React from 'react';
import {Box, Grid, List, Stack, Typography} from '@mui/material';
import ActorItem from "./components/ActorItem";
import {useGetActorsQuery} from "../../../../services/server/serverApi";

const ActorsSection = () => {

    const { data: actors } = useGetActorsQuery();

    if (!actors) {
        return <Box />;
    }

    return (
        <Stack sx={{ height: '100%' }}>
            <Grid container direction='row' alignItems='center'>
                <Grid item xs={5} textAlign='center'>
                    <Typography variant='h6' sx={{paddingLeft: '5px', paddingRight: '5px'}}>
                        Actors
                    </Typography>
                </Grid>
            </Grid>
            <List sx={{ overflowY: 'auto', height: 'calc(100% - 56px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {actors.map((actor, idx) => (
                    <ActorItem
                        key={`key-actor-item-${idx}`}
                        itemId={idx}
                        actor={actor}
                    />
                ))}
            </List>
        </Stack>
    );
};

export default ActorsSection;