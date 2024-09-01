import {Actor, Message, User} from "../../types";
import {AnyAction, ThunkAction} from "@reduxjs/toolkit";

export interface ChatService {
    chat(messages: Message[]): ThunkAction<any, any, any, AnyAction>;
    getMessageResponse: any;
}

export type Messenger = User | Actor;