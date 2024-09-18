import {useLazyGetMessagesQuery, useLazyGetSessionParticipantsQuery} from "../../../services/server/serverApi";
import {useEffect} from "react";

const useCurrentSpeaker = ({ sessionId }: { sessionId: number }) => {
    const [getMessages] = useLazyGetMessagesQuery();
    const [getSessionParticipants] = useLazyGetSessionParticipantsQuery();

    useEffect(() => {
        if (!sessionId) {
            return;
        }

        getMessages(sessionId);
    }, [sessionId]);

    const getCurrentSpeaker = async (sessionId: number|null) => {
        if (!sessionId) {
            return null;
        }

        const messages = await getMessages(sessionId).unwrap();
        const last = messages[messages.length - 1];

        const participants = await getSessionParticipants(sessionId).unwrap();

    };

    return {
        getCurrentSpeaker,
    };
};

export default useCurrentSpeaker;