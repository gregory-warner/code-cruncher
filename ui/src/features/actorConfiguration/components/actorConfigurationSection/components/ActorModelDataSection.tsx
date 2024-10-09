import {ActorDisplayItem, ModelDataType} from '../../../types';
import ActorDataSection from './ActorDataSection';
import React, {useEffect, useState} from 'react';
import {Actor, AIModel, EditableActor, ModelType} from '../../../../../types';
import {Box, Divider, Grid, Tooltip, Typography} from "@mui/material";
import ModelSelect from "../../ModelSelect";
import useModelType from "../../../hooks/modelTypes/useModelType";
import useModels from "../../../hooks/useModels";
import {useUpdateAIModelMutation} from "../../../../../services/server/serverApi";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectIsEditing, selectSelectedActor, setSelectedActor} from "../../../store/actorConfigurationSlice";

const ActorModelDataSection = () => {
    const dispatch = useAppDispatch();
    const actor: EditableActor = useAppSelector(selectSelectedActor);
    const isEditing = useAppSelector(selectIsEditing);

    const models = useModels();

    const model = actor.aiModel;
    const modelType: ModelDataType = useModelType(model);
    const modelMode = model.isLocal ? 'offline' : 'online';

    // const onSave = () => {
    //     const aiModel = modelType.appendModelType(model);
    //     updateModel({
    //         actorId: actor.actorId,
    //         aiModel,
    //     });
    // };

    // const items: ActorDisplayItem[] = [
    //     {
    //         label: 'Name',
    //         value: model.modelName,
    //         editComponent: (

    //         )
    //     },
    //     {
    //         label: 'Mode',
    //         value: modelMode,
    //         editComponent: <Typography>{modelMode}</Typography>
    //     },
    //     {
    //         label: 'Type',
    //         value: ModelType[model.modelTypeId],
    //         editComponent: <Typography>{ModelType[model.modelTypeId]}</Typography>
    //     },
    //     ...modelType.items
    // ];

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
                                    <Typography variant='body1'>{ModelType[model.modelTypeId]}</Typography>
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
            </Grid>
        </Box>
    );
};

export default ActorModelDataSection;