import React from "react";
import {AIModel, LanguageModel} from "../../types";

export interface ActorDisplayItem {
    label: string;
    value: string;
    editComponent: React.ElementType;
    width?: number;
}

export interface ModelDataType {
    items: ActorDisplayItem[];
    appendModelType: (model: AIModel) => AIModel;
}