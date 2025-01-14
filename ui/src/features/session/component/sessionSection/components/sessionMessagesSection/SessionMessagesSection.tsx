import {List, ListItem} from "@mui/material";
import React from "react";
import SessionMessage from "../sessionMessage/SessionMessage";
import SessionMessageScrollFocus from "./SessionMessageScrollFocus";
import {Message} from "../../../../../../types";

const SessionMessagesSection = ({ messages }: { messages: Message[] }) => {

    return (
        <List>
            {
                messages.map((message, idx) => (
                    <ListItem key={`session-message-${idx}`} sx={{ padding: '0.25em' }}>
                        {<SessionMessage message={message} />}
                    </ListItem>
                ))
            }
            <SessionMessageScrollFocus messages={messages} />
        </List>
    );
};

export default SessionMessagesSection;