import {useAppDispatch} from "../../../store/hooks";
import {
    useAddMessageEventDetailsMutation,
    useAddMessageMutation, useAddMessageQuestionTypesMutation,
    useLazyGetMessagesQuery
} from "../../../services/server/serverApi";
import {ServiceFactory} from "../services/serviceFactory";
import {ChatService} from "../types";
import {AddMessageRequest} from "../../../services/server/types";
import {Actor, Message, MessageTypeId, SessionParticipant} from "../../../types";

export const useActor = () => {
    const dispatch = useAppDispatch();

    const [getMessages] = useLazyGetMessagesQuery();
    const [addMessage] = useAddMessageMutation();
    const [addEvent] = useAddMessageEventDetailsMutation();
    const [addQuestionTypes] = useAddMessageQuestionTypesMutation();

    const getService = (actor: Actor): ChatService => {
        return ServiceFactory.create(actor);
    }

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

        const chatResponse = await addMessage(message).unwrap();

        if (service.isQuestion(response)) {
            const eventDetails = await addEvent(service.getEventDetails(
                chatResponse.messageId,
                response
            )).unwrap();

            const questionTypes = service.getQuestionTypes(response);

            await addQuestionTypes({messageEventId: eventDetails.messageEventDetailsId, questionTypes});
        }

        return chatResponse;
    };

    return {
        chat,
    };
};