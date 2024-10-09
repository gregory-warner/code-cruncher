import {ActorDisplayItem} from '../../../types';
import React from 'react';
import {EditableActor} from '../../../../../types';
import {Box, Divider, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectIsEditing, selectSelectedActor, setSelectedActor} from "../../../store/actorConfigurationSlice";

const ActorGeneralDataSection = () => {
    const dispatch = useAppDispatch();
    const actor: EditableActor = useAppSelector(selectSelectedActor);
    const isEditing = useAppSelector(selectIsEditing);

    return (
        <Box sx={{ width: '100%', pb: 2 }}>
            <Divider textAlign='left'>General</Divider>
            <Grid pt={1} container spacing={2} justifyContent='space-between' alignItems='flex-start'>
                <Grid item xs={11} container spacing={2}>
                    {
                        isEditing ? (
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>{`Name:`}</Typography>
                                <TextField
                                    value={actor.name}
                                    onChange={(event) => dispatch(setSelectedActor({
                                        ...actor,
                                        name: event.target.value
                                    }))}
                                />
                            </Grid>
                        ) : (
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>{`Name:`}</Typography>
                                {actor.name}
                            </Grid>
                        )
                    }
                    {
                        isEditing ? (
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>{`Title:`}</Typography>
                                <TextField
                                    value={actor.title}
                                    onChange={(event) => dispatch(setSelectedActor({
                                        ...actor,
                                        title: event.target.value
                                    }))}
                                />
                            </Grid>
                        ) : (
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>{`Title:`}</Typography>
                                {actor.title}
                            </Grid>
                        )
                    }
                </Grid>
            </Grid>
        </Box>
    );
};

export default ActorGeneralDataSection;