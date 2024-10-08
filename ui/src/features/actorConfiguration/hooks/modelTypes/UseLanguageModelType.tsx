import {AIModel, LanguageModel} from "../../../../types";
import React, {useEffect, useState} from "react";
import {TextField} from "@mui/material";
import {ActorDisplayItem, ModelDataType} from "../../types";

const useLanguageModelType = (type: LanguageModel): ModelDataType => {
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
                    onChange={(event) => setModelType({
                        ...modelType,
                        maxTokens: parseFloat(event.target.value)
                    })}
                />
            )
        },
        {
            label: 'Temperature',
            value: modelType?.temperature.toString(),
            editComponent: (
                <TextField
                    defaultValue={modelType?.temperature}
                    onChange={(event) => setModelType({
                        ...modelType,
                        temperature: parseFloat(event.target.value)
                    })}
                />
            )
        },
        {
            label: 'Frequency Penalty',
            value: modelType?.frequencyPenalty.toString(),
            editComponent: (
                <TextField
                    defaultValue={modelType?.frequencyPenalty}
                    onChange={(event) => setModelType({
                        ...modelType,
                        frequencyPenalty: parseFloat(event.target.value)
                    })}
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