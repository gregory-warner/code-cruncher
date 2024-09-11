import React from "react";

export interface ActorDisplayItem {
    label: string;
    value: string;
    editComponent: React.ElementType;
    width?: number;
}