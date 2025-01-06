import {useAppDispatch} from "../../../store/hooks";
import {
    useAddMessageMutation,
    useLazyGetMessagesQuery
} from "../../../services/server/serverApi";
import {ServiceFactory} from "../services/serviceFactory";
import {ChatService} from "../types";
import {AddMessageRequest} from "../../../services/server/types";
import {Actor, Message, MessageTypeId, SessionParticipant} from "../../../types";
import {useQuizzer} from "./useQuizzer";

export const useActor = () => {
    const dispatch = useAppDispatch();

    const [getMessages] = useLazyGetMessagesQuery();
    const [addMessage] = useAddMessageMutation();

    const { isQuizQuestion, handleQuizQuestion, isQuizzerResponse, handleQuizzerResponse } = useQuizzer();

    const getService = (actor: Actor): ChatService => {
        return ServiceFactory.create(actor);
    };

    const chat = async (sessionId: number, sessionParticipant: SessionParticipant): Promise<Message|null> => {
        const service = getService(sessionParticipant.participant as Actor);
        const messages = await getMessages(sessionId).unwrap();

        const { data: response } = await dispatch(service.chat(messages));

        const message: AddMessageRequest = {
            sessionId,
            messageTypeId: MessageTypeId.general,
            sessionParticipantId: sessionParticipant.sessionParticipantId,
            content: service.getResponseContent(response),
        };

        let chatResponse = await addMessage(message).unwrap();

        if (isQuizzerResponse(chatResponse)) {
            chatResponse = await handleQuizzerResponse(chatResponse);
        }

        if (isQuizQuestion(chatResponse)) {
            return await handleQuizQuestion(chatResponse);
        }

        return chatResponse;
    };

    return {
        chat,
    };
};