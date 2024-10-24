import {AIModel, LanguageModel} from "../../../../types";
import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {ActorDisplayItem, ModelDataType} from "../../types";
import {selectSelectedActor, setSelectedActor} from "../../store/actorConfigurationSlice";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";

const useLanguageModelType = (type: LanguageModel): ModelDataType => {
    const dispatch = useAppDispatch();
    const actor = useAppSelector(selectSelectedActor);
    const [modelType, setModelType] = useState<LanguageModel>(type);

    useEffect(() => {
        setModelType(type);
    }, [type]);

    const items: ActorDisplayItem[] = [
        {
            label: 'Max Tokens',
            value: modelType?.maxTokens.toString(),
            editComponent: (
                <TextField
                    defaultValue={modelType?.maxTokens}
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
            )
        },
        {
            label: 'Temperature',
            value: modelType?.temperature.toString(),
            editComponent: (
                <TextField
                    defaultValue={modelType?.temperature}
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
            )
        },
        {
            label: 'Frequency Penalty',
            value: modelType?.frequencyPenalty.toString(),
            editComponent: (
                <TextField
                    defaultValue={modelType?.frequencyPenalty}
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
            )
        },
    ];

    const appendModelType = (model: AIModel) => {
        return {
            ...model,
            languageModel: {
                ...type ?? {},
                ...modelType
            },
        };
    }

    return { items, appendModelType }
};

export default useLanguageModelType;