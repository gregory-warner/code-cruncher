import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {incrementCurrentSequenceId, selectCurrentSpeaker, selectSessionId} from "../sessionSlice";
import {useAddMessageMutation, useGetMessagesQuery, useLazyGetMessagesQuery} from "../../../services/server/serverApi";
import {ServiceFactory} from "../services/serviceFactory";
import {ChatService} from "../types";
import {skipToken} from "@reduxjs/toolkit/query";
import {AddMessageRequest} from "../../../services/server/types";
import {Actor, Message, MessageTypeId, MessengerTypeId} from "../../../types";

export const useActor = () => {
    const dispatch = useAppDispatch();
    const currentSpeaker = useAppSelector(selectCurrentSpeaker);
    const sessionId = useAppSelector(selectSessionId);

    const [getMessages] = useLazyGetMessagesQuery();

    const [aiService, setAiService] = useState<ChatService>(null);

    const { data: messages } = useGetMessagesQuery(sessionId || skipToken);
    const [addMessage] = useAddMessageMutation();

    const isActor = currentSpeaker && 'actorId' in currentSpeaker;

    useEffect(() => {
        if (!Array.isArray(messages) || !isActor || !sessionId) {
            return;
        }

        setAiService(ServiceFactory.create(currentSpeaker));
    }, [messages]);

    useEffect(() => {
        if (!aiService) {
            return;
        }

        dispatch(aiService.chat(messages)).then(({data: response}) => {
            const actor = currentSpeaker as Actor;

            const message: AddMessageRequest = {
                sessionId,
                messageTypeId: 0,
                messengerTypeId: MessengerTypeId.actor,
                messengerId: actor.actorId,
                content: aiService.getResponseContent(response),
            };

            addMessage(message).then((messageResponse) => {

                dispatch(incrementCurrentSequenceId());
            });
        });

    }, [aiService]);

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
        getService,
        chat,
    };
};