import React from "react";
import {AIModel} from "../../types";

export interface ActorDisplayItem {
    label: string;
    value: string;
    editComponent: React.ElementType<any, any>;
    width?: number;
    helpText?: string;
}

export interface ModelDataType {
    items: ActorDisplayItem[];
    appendModelType: (model: AIModel) => AIModel;
}