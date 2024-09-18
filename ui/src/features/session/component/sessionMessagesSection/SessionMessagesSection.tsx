import {CircularProgress, List, ListItem} from "@mui/material";
import {useLazyGetMessagesQuery} from "../../../../services/server/serverApi";
import React, {useEffect} from "react";
import {selectParticipants, selectSessionId} from "../../sessionSlice";
import {useAppSelector} from "../../../../store/hooks";
import SessionMessage from "../sessionMessage/SessionMessage";
import SessionMessageScrollFocus from "./SessionMessageScrollFocus";
import {MessengerTypeIds, SessionParticipantType} from "../../../../types";
import {isActor, isUser} from "../../../../utils/util";

const SessionMessagesSection = () => {
    const sessionId = useAppSelector(selectSessionId);

    const [getMessages, { data: messages, isLoading, error }] = useLazyGetMessagesQuery();
    const participants = useAppSelector(selectParticipants);

    useEffect(() => {
        if (sessionId > 0) {
            getMessages(sessionId);
        }
    }, [sessionId]);

    if (!sessionId || !Array.isArray(participants) || participants.length === 0) {
        return <>Please start a session</>
    }

    if (isLoading || !Array.isArray(messages)) {
        return <CircularProgress />;
    }

    if (error) {
        console.log((error as Error).message);
        return <>Unable to load messages</>
    }

    const getMessenger = (messengerId: number, messengerTypeId: number): SessionParticipantType => {
        if (messengerTypeId === MessengerTypeIds.actor) {
            return participants.find(participant => isActor(participant) && participant.actorId === messengerId);
        }
        return participants.find(participant => isUser(participant) && participant.userId === messengerId);
    }

    return (
        <List >
            {
                messages.map((message, idx) => (
                    <ListItem key={`session-message-${idx}`}>
                        {<SessionMessage message={message} messenger={getMessenger(message.messengerId, message.messengerTypeId)} />}
                    </ListItem>
                ))
            }
            <SessionMessageScrollFocus messages={messages} />
        </List>
    );
};

export default SessionMessagesSection;