import {ActorDisplayItem, ModelDataType} from '../../../types';
import ActorDataSection from './ActorDataSection';
import React, {useEffect, useState} from 'react';
import {Actor, AIModel, ModelType} from '../../../../../types';
import {Typography} from "@mui/material";
import ModelSelect from "../../ModelSelect";
import useModelType from "../../../hooks/modelTypes/useModelType";
import useModels from "../../../hooks/useModels";

const ActorModelDataSection = ({ actor }: {actor: Actor}) => {

    const [model, setModel] = useState<AIModel>(actor.aiModel);

    const modelType: ModelDataType = useModelType(actor.aiModel);

    const models = useModels();

    const modelMode = model.isLocal ? 'offline' : 'online';

    useEffect(() => {
        setModel(actor.aiModel);
    }, [actor]);

    const onSave = () => {
        const aiModel = modelType.appendModelType(aiModel);

    };

    const items: ActorDisplayItem[] = [
        {
            label: 'Name',
            value: model.modelName,
            editComponent: (
                <ModelSelect
                    selectedModel={model.modelName}
                    handleModelChange={(event) => {
                        const selectedModel = models.find(model => model.name === event.target.value) ?? {};
                        setModel(
                            {...model,
                                modelName: selectedModel.name,
                                isLocal: selectedModel.isLocal
                            }
                        );
                    }}
                />
            )
        },
        {
            label: 'Mode',
            value: modelMode,
            editComponent: <Typography>{modelMode}</Typography>
        },
        {
            label: 'Type',
            value: ModelType[model.modelTypeId],
            editComponent: <Typography>{ModelType[model.modelTypeId]}</Typography>
        },
        ...modelType.items
    ];

    return (
        <ActorDataSection items={items} title='AI Model' onSave={onSave} />
    );
};

export default ActorModelDataSection;