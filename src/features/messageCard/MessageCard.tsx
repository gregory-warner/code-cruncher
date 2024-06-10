import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Typography, Avatar, Card, Stack, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MessageParser from './MessageParser';
import { selectCardStyle } from './store/messageCardSlice';
import './messageCardStyle.css';
import {selectMessages, setMessages} from "../conversation/store/conversationSlice";
import {VolumeUp} from "@mui/icons-material";
import {defaultCardStyle} from "./store/types";
import {selectActor} from "../actor/actorSlice";
import {selectUser} from "../user/userSlice";
import {useDeleteMessageMutation} from "../../services/serverApi";

enum MessengerType {
    user,
    actor,
}

const MessageCard = ({ message }: {message: Message}) => {
    const [messenger, setMessenger] = useState(null);
    const [style, setStyle] = useState(useAppSelector(selectCardStyle));
    const messages = useAppSelector(selectMessages);

    const messengers = {
        user: useAppSelector(selectUser),
        actor: useAppSelector(selectActor),
    }

    const dispatch = useAppDispatch();
    const [avatarPath, setAvatarPath] = useState("src/img/default_avatar.png");

    const [deleteMessage] = useDeleteMessageMutation();

    useEffect(() => {
        setMessenger(messengers[MessengerType[message.messengerTypeId]]);
    }, [message]);

    useEffect(() => {
        if (!messenger) {
            return;
        }

        const image = messenger?.configuration?.avatar ?? "default_avatar.png";
        setAvatarPath(`src/img/${image}`);
        setStyle(messenger.configuration?.colorTheme?.messageCard ?? defaultCardStyle);
    }, [messenger]);

    const deleteMessageHandler = async () => {
        const prunedMessages = messages.filter(m => m.id !== message.id);
        dispatch(setMessages(prunedMessages)); // remove this and use the refetch message that should be created

        await deleteMessage(message.id).unwrap();
    }

    const textToSpeech = () => {
        debugger;
        // if (messenger.configuration.ttsModel) {
        //     sayText({text: message.content, model: messenger.configuration.ttsModel});
        // }
    }

    if (!messenger) {
        return;
    }

    return(
        <Card 
            key={`key-message-card-${message.messengerId}-${message.timestamp}`}
            sx={style}
            onClick={()=>{}}
        >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={4} border={16} borderColor={style.borderColor} sx={{ display: "flex", alignItems: "center"  }}>
                <Avatar className="mobile-hidden" alt={messenger ? `${messenger.name}'s avatar` : "default avatar"} src={avatarPath} sx={{ width: 100, height: 100, alignSelf: { xs: 'center', sm: 'flex-start' } }}/>
                <Stack direction={"column"} sx={{ flexGrow: 1 }}>
                    <Stack direction={"row"} sx={{ flexGrow: 1}}>
                        <Typography className="text-center-on-mobile" variant="h3" color={style.nameColor} fontFamily={"roboto"}>{messenger?.name ?? ""}</Typography>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <IconButton onClick={textToSpeech} sx={{ minWidth: '40px', '&:hover': { backgroundColor: 'rgba(255,100,100,0.2)' } }}>
                            <VolumeUp />
                        </IconButton>
                        <IconButton onClick={deleteMessageHandler} sx={{ minWidth: '40px', '&:hover': { backgroundColor: 'rgba(255,100,100,0.2)' } }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    {<div style={{ color: style.textColor ?? "black" }}><MessageParser message={message} /></div>}
                </Stack>
            </Stack>
        </Card>
    );
};

export default MessageCard;