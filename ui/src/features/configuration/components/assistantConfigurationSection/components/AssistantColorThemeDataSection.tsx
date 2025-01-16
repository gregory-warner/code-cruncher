import React from 'react';
import {EditableActor, MessageCard} from '../../../../../types';
import {Box, Divider, Grid, TextField, Typography} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectIsEditing, selectSelectedActor, setSelectedActor} from "../../../../assistant/assistantSlice";

const AssistantColorThemeDataSection = () => {
    const dispatch = useAppDispatch();
    const actor: EditableActor = useAppSelector(selectSelectedActor);
    const isEditing = useAppSelector(selectIsEditing);

    const messageCardStyle: MessageCard|null = actor?.colorTheme.messageCard ?? null;

    if (!messageCardStyle) {
        return <Box />;
    }

    return (
        <Box sx={{ width: '100%', pb: 2 }}>
            <Divider textAlign='left'>Color Theme</Divider>
            <Grid pt={1} container spacing={2} justifyContent='space-between' alignItems='flex-start'>
                {
                    isEditing ? (
                        <Grid item xs={11} container spacing={2}>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Name:</Typography>
                                <TextField
                                    value={messageCardStyle.nameColor}
                                    onChange={(event) => dispatch(setSelectedActor({
                                        ...actor,
                                        colorTheme: {
                                            ...actor.colorTheme,
                                            messageCard: {
                                                ...actor.colorTheme.messageCard,
                                                nameColor: event.target.value
                                            }
                                        }
                                    }))}
                                />
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Border:</Typography>
                                <TextField
                                    value={messageCardStyle.borderColor}
                                    onChange={(event) => dispatch(setSelectedActor({
                                        ...actor,
                                        colorTheme: {
                                            ...actor.colorTheme,
                                            messageCard: {
                                                ...actor.colorTheme.messageCard,
                                                borderColor: event.target.value
                                            }
                                        }
                                    }))}
                                />
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Contents:</Typography>
                                <TextField
                                    value={messageCardStyle.contentsColor}
                                    onChange={(event) => dispatch(setSelectedActor({
                                        ...actor,
                                        colorTheme: {
                                            ...actor.colorTheme,
                                            messageCard: {
                                                ...actor.colorTheme.messageCard,
                                                contentsColor: event.target.value
                                            }
                                        }
                                    }))}
                                />
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item xs={11} container spacing={2}>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Name:</Typography>
                                <Typography variant='body1'>{messageCardStyle.nameColor}</Typography>
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Border:</Typography>
                                <Typography variant='body1'>{messageCardStyle.borderColor}</Typography>
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Contents:</Typography>
                                <Typography variant='body1'>{messageCardStyle.contentsColor}</Typography>
                            </Grid>
                        </Grid>
                    )
                }
            </Grid>
        </Box>
    );
};

export default AssistantColorThemeDataSection;