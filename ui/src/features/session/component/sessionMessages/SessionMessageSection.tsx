import {CircularProgress, List, ListItem} from "@mui/material";
import {useLazyGetMessagesQuery} from "../../../../services/server/serverApi";
import React, {useEffect} from "react";
import {selectSessionId} from "../../store/sessionSlice";
import {useAppSelector} from "../../../../store/hooks";
import SessionMessage from "./SessionMessage";
import SessionMessageScrollFocus from "./SessionMessageScrollFocus";

const SessionMessageSection = () => {
    const sessionId = useAppSelector(selectSessionId);

    const [getMessages, { data: messages, isLoading, error }] = useLazyGetMessagesQuery(); // Use the hook to get a reference to the lazy getMessages query function and its results

    useEffect(() => {
        if (sessionId > 0) {
            getMessages(sessionId);
        }
    }, [sessionId]);

    if (!sessionId) {
        return <>Please start a session</>
    }

    if (isLoading || !Array.isArray(messages)) {
        return <CircularProgress />;
    }

    if (error) {
        console.log((error as Error).message);
        return <>Unable to load messages</>
    }

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