import {
    useLazyGetActiveSessionParticipantsQuery,
    useLazyGetMessagesQuery,
} from "../../../services/server/serverApi";
import {SessionParticipant} from "../../../types";
import {useAppDispatch} from "../../../store/hooks";
import {updateSessionStatusCurrentSpeaker} from "../sessionSlice";

const useCurrentSpeaker = () => {
    const dispatch = useAppDispatch();

    const [getMessages] = useLazyGetMessagesQuery();
    const [getSessionParticipants] = useLazyGetActiveSessionParticipantsQuery();

    const getLastParticipantIndex = async (sessionId: number, participants: SessionParticipant[]): Promise<number> => {
        const messages = await getMessages(sessionId).unwrap();

        if (messages.length === 0) {
            return -1;
        }

        const lastMessage = messages[messages.length - 1];

        return participants.findIndex(p => p.sessionParticipantId === lastMessage.sessionParticipantId);
    }

    const getCurrentSpeaker= async (sessionId: number|null): Promise<SessionParticipant>  => {
        if (!sessionId) {
            return null;
        }

        const participants: SessionParticipant[] = await getSessionParticipants(sessionId).unwrap();

        const lastIndex = await getLastParticipantIndex(sessionId, participants);

        const next = (lastIndex + 1) % participants.length;

        const currentSpeaker = participants[next];
        dispatch(updateSessionStatusCurrentSpeaker({ sessionId, currentSpeaker }));

        return currentSpeaker;
    };

    return {
        getLastParticipantIndex,
        getCurrentSpeaker,
    };
};

export default useCurrentSpeaker;