import {AIModel, LanguageModel} from "../../../../types";
import React, {useState} from "react";
import {TextField} from "@mui/material";
import {ActorDisplayItem, ModelDataType} from "../../types";

const useLanguageModelType = (type: LanguageModel): ModelDataType => {
    const [modelType, setModelType] = useState<LanguageModel>(type);

    const items: ActorDisplayItem[] = [
        {
            label: 'Max Tokens',
            value: type?.maxTokens,
            editComponent: (
                <TextField
                    defaultValue={type?.maxTokens}
                    onChange={(event) => setModelType({
                        ...modelType,
                        maxTokens: event.target.value
                    })}
                />
            )
        },
        {
            label: 'Temperature',
            value: type?.temperature,
            editComponent: (
                <TextField
                    defaultValue={type?.temperature}
                    onChange={(event) => setModelType({
                        ...modelType,
                        temperature: event.target.value
                    })}
                />
            )
        },
        {
            label: 'Frequency Penalty',
            value: type?.frequencyPenalty,
            editComponent: (
                <TextField
                    defaultValue={type?.frequencyPenalty}
                    onChange={(event) => setModelType({
                        ...modelType,
                        frequencyPenalty: event.target.value
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
                modelType
            },
        };
    }

    return { items, appendModelType }
};

export default useLanguageModelType;