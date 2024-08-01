import { useState, useEffect } from 'react';
import { useAppSelector } from '../../store/hooks';
import { Typography, Avatar, Card, Stack, Grid } from '@mui/material';
import { selectCardStyle } from '../messageCard/store/messageCardSlice';
import MessageImageCard from './MessageImageCard';
import {defaultCardStyle} from "../messageCard/store/types";
import {MessengerTypeIds} from "../../types";
import {selectActor, selectUser} from "../conversation/store/conversationSlice";

const MessageImageCards = ({ message }: {message: Message}) => {

    const messengers = {
        user: useAppSelector(selectUser),
        actor: useAppSelector(selectActor),
    }

    const [messenger, setMessenger] = useState(null);
    const [style, setStyle] = useState(useAppSelector(selectCardStyle));

    const [avatarPath, setAvatarPath] = useState("src/img/default_avatar.png");

    useEffect(() => {
        setMessenger(messengers[MessengerTypeIds[message.messengerTypeId]]);
    }, [message]);

    useEffect(() => {
        if (!messenger) {
            return;
        }

        const image = messenger?.configuration?.avatar ?? "default_avatar.png";
        setAvatarPath(`src/img/${image}`);
        setStyle(messenger.configuration?.colorTheme?.messageCard ?? defaultCardStyle);
    }, [messenger]);

    const getImages = () => {
        if (message.data?.imageLinks?.length === 0) {
            return <Typography>No Images to Render</Typography>
        }

        return message.data.imageLinks.map((imageLink, index) => {
            return <Grid item key={index}>
                <MessageImageCard imageUrl={imageLink} title={`Image ${index + 1}`} />
            </Grid>
        })
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
                    <Typography className="text-center-on-mobile" variant="h3" color={style.nameColor} fontFamily={"roboto"}>{messenger?.name ?? ""}</Typography>
                    <Grid container spacing={2}>
                        {getImages()}
                    </Grid>
                </Stack>
            </Stack>
        </Card>
    );
};

export default MessageImageCards;