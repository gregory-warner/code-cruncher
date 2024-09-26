import {useLazyGetMessagesQuery, useLazyGetSessionParticipantsQuery} from "../../../services/server/serverApi";
import {ParticipantTypeId, SessionParticipantType} from "../../../types";
import {useAppDispatch} from "../../../store/hooks";
import {updateSessionStatusCurrentSpeaker} from "../sessionSlice";

const useCurrentSpeaker = () => {
    const dispatch = useAppDispatch();

    const [getMessages] = useLazyGetMessagesQuery();
    const [getSessionParticipants] = useLazyGetSessionParticipantsQuery();

    const getLastParticipantIndex = async (sessionId: number, participants: SessionParticipantType[]): Promise<number> => {
        const messages = await getMessages(sessionId).unwrap();

        if (messages.length === 0) {
            return -1;
        }

        const lastMessage = messages[messages.length - 1];

        switch (lastMessage.messengerTypeId) {
            case ParticipantTypeId.user:
                return participants.findIndex(participant => 'userId' in participant && participant.userId === lastMessage.messengerId);
            case ParticipantTypeId.actor:
                return participants.findIndex(participant => 'actorId' in participant && participant.actorId === lastMessage.messengerId);
            default:
                return -1;
        }
    }

    const getCurrentSpeaker= async (sessionId: number|null): Promise<SessionParticipantType>  => {
        if (!sessionId) {
            return null;
        }

        const participants = await getSessionParticipants(sessionId).unwrap();

        const lastIndex = await getLastParticipantIndex(sessionId, participants);

        const next = (lastIndex + 1) % participants.length;

        const currentSpeaker = participants[next];
        dispatch(updateSessionStatusCurrentSpeaker({ sessionId, currentSpeaker }));

        return participants[next];
    };

    return {
        getLastParticipantIndex,
        getCurrentSpeaker,
    };
};

export default useCurrentSpeaker;