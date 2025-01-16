import React from "react";
import {Box, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectIsEditing, selectSelectedActor, setSelectedActor} from "../../../../assistant/assistantSlice";
import {EditableActor} from "../../../../../types";

const AssistantLanguageModelSection = () => {
    const dispatch = useAppDispatch();
    const actor: EditableActor = useAppSelector(selectSelectedActor);
    const isEditing = useAppSelector(selectIsEditing);

    const languageModel = actor.aiModel.languageModel;

    return (
        <Box sx={{ width: '100%', pb: 2 }}>
            <Grid pt={1} container spacing={2} justifyContent='space-between' alignItems='flex-start'>
                {
                    isEditing ? (
                        <Grid item xs={11} container spacing={2}>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Max Tokens:</Typography>
                                <TextField
                                    defaultValue={languageModel.maxTokens}
                                    onChange={(event) => {
                                        dispatch(setSelectedActor({
                                            ...actor,
                                            aiModel: {
                                                ...actor.aiModel,
                                                languageModel: {
                                                    ...actor.aiModel.languageModel,
                                                    maxTokens: parseInt(event.target.value),
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Temperature:</Typography>
                                <TextField
                                    defaultValue={languageModel.temperature}
                                    onChange={(event) => {
                                        dispatch(setSelectedActor({
                                            ...actor,
                                            aiModel: {
                                                ...actor.aiModel,
                                                languageModel: {
                                                    ...actor.aiModel.languageModel,
                                                    temperature: parseFloat(event.target.value),
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Frequency Penalty:</Typography>
                                <TextField
                                    defaultValue={languageModel.frequencyPenalty}
                                    onChange={(event) => {
                                        dispatch(setSelectedActor({
                                            ...actor,
                                            aiModel: {
                                                ...actor.aiModel,
                                                languageModel: {
                                                    ...actor.aiModel.languageModel,
                                                    frequencyPenalty: parseFloat(event.target.value),
                                                }
                                            }
                                        }))
                                    }}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item xs={11} container spacing={2}>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Max Tokens:</Typography>
                                <Typography variant='body1'>{languageModel.maxTokens}</Typography>
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Temperature:</Typography>
                                <Typography variant='body1'>{languageModel.temperature}</Typography>
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Frequency Penalty:</Typography>
                                <Typography variant='body1'>{languageModel.frequencyPenalty}</Typography>
                            </Grid>

                        </Grid>
                    )
                }
            </Grid>
        </Box>
    );
};

export default AssistantLanguageModelSection;