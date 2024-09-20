import React from "react";
import {useAppDispatch} from "../../../store/hooks";
import {useAddMessageMutation, useLazyGetMessagesQuery} from "../../../services/server/serverApi";
import {ServiceFactory} from "../services/serviceFactory";
import {ChatService} from "../types";
import {AddMessageRequest} from "../../../services/server/types";
import {Actor, Message, MessageTypeId, MessengerTypeId} from "../../../types";

export const useActor = () => {
    const dispatch = useAppDispatch();

    const [getMessages] = useLazyGetMessagesQuery();
    const [addMessage] = useAddMessageMutation();

    const getService = (actor: Actor): ChatService => {
        return ServiceFactory.create(actor);
    }

    const chat = async (sessionId: number, actor: Actor): Promise<Message|null> => {
        const service = getService(actor);
        const messages = await getMessages(sessionId).unwrap();

        const { data: response } = await dispatch(service.chat(messages));

        const message: AddMessageRequest = {
            sessionId,
            messageTypeId: MessageTypeId.general,
            messengerTypeId: MessengerTypeId.actor,
            messengerId: actor.actorId,
            content: service.getResponseContent(response),
        };

        return await addMessage(message).unwrap();
    };

    return {
        chat,
    };
};