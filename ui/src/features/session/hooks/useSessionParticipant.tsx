import {useAppSelector} from "../../../store/hooks";
import {selectSessionId} from "../sessionSlice";
import {useLazyGetSessionParticipantsQuery} from "../../../services/server/serverApi";
import {SessionParticipantType} from "../../../types";

export const useSessionParticipant = () => {
    const sessionId = useAppSelector(selectSessionId);

    const [getSessionParticipants] = useLazyGetSessionParticipantsQuery();

    const getSessionParticipant = async (participant: SessionParticipantType) => {
        const sessionParticipants = await getSessionParticipants(sessionId).unwrap();

        return sessionParticipants.find(sp => (
            ('actorId' in sp.participant && 'actorId' in participant && sp.participant.actorId === participant.actorId) ||
            ('userId' in sp.participant && 'userId' in participant && sp.participant.userId === participant.userId)
        ));
    };

    return {
        getSessionParticipant,
    };
};