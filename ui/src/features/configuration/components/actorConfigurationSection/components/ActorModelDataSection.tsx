import React from 'react';
import {EditableActor, ModelType} from '../../../../../types';
import {Box, Divider, Grid, Typography} from "@mui/material";
import ModelSelect from "../../ModelSelect";
import useModels from "../../../hooks/useModels";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectIsEditing, selectSelectedActor, setSelectedActor} from "../../../../assistant/assistantSlice";
import ActorLanguageModelSection from "./ActorLanguageModelSection";

const ActorModelDataSection = () => {
    const dispatch = useAppDispatch();
    const actor: EditableActor = useAppSelector(selectSelectedActor);
    const isEditing = useAppSelector(selectIsEditing);

    const models = useModels();

    const model = actor.aiModel;
    const modelMode = model.modelName ? (model.isLocal ? 'offline' : 'online') : '--';

    return (
        <Box sx={{ width: '100%', pb: 2 }}>
            <Divider textAlign='left'>AI Model</Divider>
            <Grid pt={1} container spacing={2} justifyContent='space-between' alignItems='flex-start'>
                {
                    isEditing ? (
                        <Grid item xs={11} container spacing={2}>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Name:</Typography>
                                <ModelSelect
                                    selectedModel={actor.aiModel.modelName}
                                    handleModelChange={(event) => {
                                        const selectedModel = models.find(model => model.name === event.target.value);
                                        dispatch(setSelectedActor({
                                            ...actor,
                                            aiModel: {
                                                ...model,
                                                modelName: selectedModel.name,
                                                isLocal: selectedModel.isLocal,
                                                modelIdentifier: selectedModel.modelIdentifier,
                                                modelTypeId: selectedModel.modelTypeId,
                                            }
                                        }))
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Mode:</Typography>
                                <Typography variant='body1'>{modelMode}</Typography>
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Type:</Typography>
                                <Typography variant='body1'>{ModelType[model.modelTypeId] ?? '--'}</Typography>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid item xs={11} container spacing={2}>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Name:</Typography>
                                <Typography variant='body1'>{model.modelName}</Typography>
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Mode:</Typography>
                                <Typography variant='body1'>{modelMode}</Typography>
                            </Grid>
                            <Grid item xs={4} display='flex' alignItems='center'>
                                <Typography variant='body2' mr={1}>Type:</Typography>
                                <Typography variant='body1'>{ModelType[model.modelTypeId]}</Typography>
                            </Grid>

                        </Grid>
                    )
                }
                { model.modelTypeId === ModelType.language && <ActorLanguageModelSection /> }
            </Grid>
        </Box>
    );
};

export default ActorModelDataSection;