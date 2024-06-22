import { useEffect, useRef } from 'react';
import { List, ListItem } from '@mui/material';
import MessageCard from '../messageCard/MessageCard';
import MessageImageCards from '../messageImageCard/MessageImageCards';
import {useAppSelector} from "../../store/hooks";
import {selectDialogId} from "./store/conversationSlice";
import {useLazyGetMessagesQuery} from "../../services/server/serverApi";

const ScrollFocusPoint = ({ messages }: { messages: Message[] }) => {
    const ref = useRef<HTMLInputElement|null>(null);
    const prevLength = useRef<number>(0);
    
    useEffect(() => {
        if (messages.length > prevLength.current) {
            ref.current?.scrollIntoView();
        }
        prevLength.current = messages.length;
    }, [messages]);
    return <div ref={ref} />;
};

const getMessageCardType = (message: Message) => {
    if (message.data?.imageLinks.length > 0) {
        return <MessageImageCards message={message} />;
    }
    return <MessageCard message={message} />;
}

const Conversation = () => {
    const dialogId = useAppSelector(selectDialogId);

    const [getMessages, {data: messages, isLoading }] = useLazyGetMessagesQuery();

    useEffect(() => {
        if (dialogId <= 0) {
            return;
        }
        getMessages(dialogId, false);
    }, [dialogId]);

    if (!Array.isArray(messages) || isLoading) {
        return (<></>);
    }

    return (
        <List>
            {messages.map((message, idx) => {
            
                return <ListItem key={`key-message-card-${idx}`}>{getMessageCardType(message)}</ListItem>;
            })}
            <ScrollFocusPoint messages={messages} />
        </List>
    );
};

export default Conversation;