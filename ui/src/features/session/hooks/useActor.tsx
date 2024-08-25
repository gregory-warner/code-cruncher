import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {selectCurrentSpeaker, selectSessionId} from "../store/sessionSlice";
import {useLazyGetMessagesQuery} from "../../../services/server/serverApi";
import {ServiceFactory} from "../services/serviceFactory";
import {ChatService} from "../types";

export const useActor = () => {
    const dispatch = useAppDispatch();
    const currentSpeaker = useAppSelector(selectCurrentSpeaker);
    const sessionId = useAppSelector(selectSessionId);

    const [aiService, setAiService] = useState<ChatService>(null);

    const [getMessages] = useLazyGetMessagesQuery();

    const isActor = currentSpeaker && 'actorId' in currentSpeaker;

    useEffect(() => {
        if (!isActor || !sessionId) {
            return;
        }

        setAiService(ServiceFactory.create(currentSpeaker));
    }, [currentSpeaker]);

    useEffect(() => {
        if (!aiService) {
            return;

        }

        getMessages(sessionId).then(({ data: messages})=> {
            dispatch(aiService.chat(messages));
        });
    }, [aiService]);

};