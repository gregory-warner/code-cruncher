import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {
    useAddParticipantMutation, useDeleteParticipantFromSessionMutation,
    useLazyGetSessionParticipantsQuery
} from "../../../services/server/serverApi";
import {ParticipantTypeId, SessionParticipant, SessionParticipantType} from "../../../types";
import {setSnackbar} from "../../../app/store/appSlice";
import {selectSession} from "../sessionSlice";
import {isUser} from "../../../utils/util";

export const useSessionParticipant = () => {
    const dispatch = useAppDispatch();
    const session = useAppSelector(selectSession);

    const sessionId = session?.sessionId ?? 0;

    const [getSessionParticipants] = useLazyGetSessionParticipantsQuery();

    const [addParticipant] = useAddParticipantMutation();
    const [deleteParticipant] = useDeleteParticipantFromSessionMutation();

    const addParticipantToSession = async (assistantId?: number, sessionId?: number) => {
        if (!assistantId || !sessionId) {
            return;
        }

        const newParticipant = await addParticipant({
            sessionId,
            participantId: assistantId,
            participantTypeId: ParticipantTypeId.actor,
        }).unwrap();

        if (!newParticipant.participantId) {
            dispatch(setSnackbar({ message: `Unable to add new participant` }));
        }
    };

    const deleteParticipantFromSession = async (sessionId: number, sessionParticipant: SessionParticipant) => {
        if (!sessionId || isUser(sessionParticipant.participant)) {
            return;
        }

        const sessionParticipantId = sessionParticipant.sessionParticipantId;

        await deleteParticipant({ sessionId, sessionParticipantId }).unwrap();
    };

    const getSessionParticipant = async (participant: SessionParticipantType) => {
        const sessionParticipants = await getSessionParticipants(sessionId).unwrap();

        return sessionParticipants.find(sp => (
            ('actorId' in sp.participant && 'actorId' in participant && sp.participant.actorId === participant.actorId) ||
            ('userId' in sp.participant && 'userId' in participant && sp.participant.userId === participant.userId)
        ));
    };

    return {
        getSessionParticipant,
        addParticipantToSession,
        deleteParticipantFromSession,
        getSessionParticipants,
    };
};