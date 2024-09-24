import {useAppSelector} from "../../../store/hooks";
import {selectSelectedParticipant, selectSessionId} from "../sessionSlice";

export const useParticipant = () => {
    const sessionId = useAppSelector(selectSessionId);

    const selectedParticipant = useAppSelector(state => (
        sessionId ? selectSelectedParticipant(state, sessionId) : null)
    );

    const isActor = selectedParticipant && 'actorId' in selectedParticipant;
    const isUser = selectedParticipant && 'userId' in selectedParticipant;

    return {
        selectedParticipant,
        isActor,
    };
};