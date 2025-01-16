import {ActorDisplayItem} from '../../../types';
import React from 'react';
import {EditableActor, Prompt} from '../../../../../types';
import {Box, Divider, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectIsEditing, selectSelectedActor, setSelectedActor} from "../../../store/actorConfigurationSlice";

const ActorPromptDataSection = () => {
    const dispatch = useAppDispatch();
    const actor: EditableActor = useAppSelector(selectSelectedActor);
    const isEditing = useAppSelector(selectIsEditing);

    const prompt: Prompt|null = actor.prompt ?? null;

    return (
        <Box sx={{ width: '100%', pb: 2 }}>
            <Divider textAlign='left'>Prompt</Divider>
            <Grid pt={1} container spacing={2} justifyContent='space-between' alignItems='flex-start'>
                {
                    isEditing ? (
                        <Grid item xs={11} container spacing={2}>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Name:</Typography>
                                <TextField
                                    value={prompt.promptName}
                                    onChange={(event) => dispatch(setSelectedActor({
                                        ...actor,
                                        prompt: {
                                            ...prompt,
                                            promptName: event.target.value,
                                        }
                                    }))}
                                />
                            </Grid>
                            <Grid item xs={8} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Postfix:</Typography>
                                <TextField
                                    value={prompt.postfix}
                                    onChange={(event) => dispatch(setSelectedActor({
                                        ...actor,
                                        prompt: {
                                            ...prompt,
                                            postfix: event.target.value,
                                        }
                                    }))}
                                />
                            </Grid>
                            <Grid item xs={12} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Prompt:</Typography>
                                <TextField
                                    fullWidth
                                    multiline
                                    maxRows={7}
                                    minRows={3}
                                    value={prompt.prompt}
                                    onChange={(event) => dispatch(setSelectedActor({
                                        ...actor,
                                        prompt: {
                                            ...prompt,
                                            prompt: event.target.value,
                                        }
                                    }))}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item xs={11} container spacing={2}>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Name:</Typography>
                                <Typography variant='body1'>{prompt.promptName}</Typography>
                            </Grid>
                            <Grid item xs={8} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Postfix:</Typography>
                                <Typography variant='body1'>{prompt.postfix}</Typography>
                            </Grid>
                            <Grid item xs={12} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Prompt:</Typography>
                                <Typography variant='body1'>{prompt.prompt}</Typography>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    );
};

export default ActorPromptDataSection;