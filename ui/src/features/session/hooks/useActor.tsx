import {useEffect, useState} from "react";
import {useAppSelector} from "../../../store/hooks";
import {selectCurrentSpeaker, selectSessionId} from "../store/sessionSlice";
import {useLazyGetMessagesQuery} from "../../../services/server/serverApi";

export const useActor = () => {
    const currentSpeaker = useAppSelector(selectCurrentSpeaker);
    const sessionId = useAppSelector(selectSessionId);

    const [response, setResponse] = useState<string>('');

    const [getMessages, {data: messages, isLoading }] = useLazyGetMessagesQuery();


    const isActor = currentSpeaker && 'actorId' in currentSpeaker;

    useEffect(() => {
        if (!isActor || !sessionId) {
            return;
        }

        getMessages(sessionId).then(messages => {

        });

    }, [currentSpeaker]);
};