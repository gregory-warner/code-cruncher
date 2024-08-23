import {CircularProgress, List, ListItem} from "@mui/material";
import {useLazyGetMessagesQuery} from "../../../../services/server/serverApi";
import React, {useEffect} from "react";
import {selectSessionId} from "../../store/sessionSlice";
import {useAppSelector} from "../../../../store/hooks";
import SessionMessage from "./SessionMessage";
import SessionMessageScrollFocus from "./SessionMessageScrollFocus";

const SessionMessageSection = () => {
    const [getMessages, {data: messages, isLoading }] = useLazyGetMessagesQuery();
    const sessionId = useAppSelector(selectSessionId);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (!Array.isArray(messages)) {
        return <>No messages found</>
    }

    useEffect(() => {
        if (sessionId <= 0) {
            return;
        }

        getMessages(sessionId, false);
    }, [sessionId]);

    return (
        <List>
            {
                messages.map((message, idx) => (
                    <ListItem key={`session-message-${idx}`}>
                        {<SessionMessage message={message} />}
                    </ListItem>
                ))
            }
            <SessionMessageScrollFocus messages={messages} />
        </List>
    );
};

export default SessionMessageSection;