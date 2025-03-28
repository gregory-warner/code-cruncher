import {selectSession, setSession, setSessionId} from "../sessionSlice";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {Session} from "../../../types";
import {useDeleteSessionMutation} from "../../../services/server/serverApi";

const useSessionUpdater = () => {
    const dispatch = useAppDispatch();
    const session = useAppSelector(selectSession);

    const [deleteSession] = useDeleteSessionMutation();

    const resetSession = () => {
        dispatch(setSession(null));
        dispatch(setSessionId(0));
    };

    const updateSession = (session?: Session|null) => {
        if (!session) {
            resetSession();
            return;
        }

        dispatch(setSession(session));
        dispatch(setSessionId(session?.sessionId ?? 0));
    };

    const deleteSessionById = async (sessionId?: number|null) => {
        if (!sessionId) {
            return;
        }

        await deleteSession(sessionId);

        const currentSessionId = session?.sessionId ?? 0;
        if (currentSessionId === sessionId) {
            resetSession();
        }
    };

    return {
        resetSession,
        updateSession,
        deleteSessionById,
    }
};

export default useSessionUpdater;