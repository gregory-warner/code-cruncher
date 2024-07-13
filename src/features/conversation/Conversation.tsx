import { useEffect, useRef } from 'react';
import { List, ListItem } from '@mui/material';
import MessageCard from '../messageCard/MessageCard';
import MessageImageCards from '../messageImageCard/MessageImageCards';
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {selectActor, selectDialogId, updateDialogId} from "./store/conversationSlice";
import {useGetUserQuery, useLazyGetMessagesQuery} from "../../services/server/serverApi";
import {defaultUser, selectUser, setUser} from "../user/userSlice";
import {useNavigate} from "react-router-dom";

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

    const dispatch = useAppDispatch();
    const dialogId = useAppSelector(selectDialogId);
    const actor = useAppSelector(selectActor);
    const user = useAppSelector(selectUser);

    const navigate = useNavigate();

    const { data: userData } = useGetUserQuery(defaultUser);

    const [getMessages, {data: messages, isLoading }] = useLazyGetMessagesQuery();

    useEffect(() => {
        userData && dispatch(setUser(userData));
    }, [userData]);

    useEffect(() => {
        if (!actor || !user) return;

        dispatch(updateDialogId({user, actor}));
    }, [user, actor]);

    useEffect(() => {
        if (dialogId <= 0) {
            return;
        }
        getMessages(dialogId, false);
    }, [dialogId]);

    if (!actor || !user) {
        navigate('/');
        return (<h1>Unable to get participants</h1>)
    }

    if (!Array.isArray(messages) || isLoading) {
        return (<>Loading...</>);
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