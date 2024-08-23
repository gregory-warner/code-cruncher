import {Message} from "../../../../types";
import MessageImageCards from "../../../messageImageCard/MessageImageCards";
import MessageCard from "../../../messageCard/MessageCard";
import React from "react";

const getMessageCardType = (message: Message) => {
    if (message.data?.imageLinks.length > 0) {
        return <MessageImageCards message={message} />;
    }
    // return <MessageCard message={message} />;
}

const SessionMessage = ({ message }: {message: Message}) => {
    return (
        <h1>{message.content}</h1>
    );
};

export default SessionMessage;