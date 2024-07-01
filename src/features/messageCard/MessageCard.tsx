import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Typography, Avatar, Card, Stack, IconButton, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MessageParser from './MessageParser';
import './messageCardStyle.css';
import {LockOpen, VolumeUp} from "@mui/icons-material";
import LockIcon from '@mui/icons-material/Lock';
import {selectActor} from "../actor/actorSlice";
import {selectUser} from "../user/userSlice";
import {
    useDeleteMessageMutation,
    useUpdateMessageMutation
} from "../../services/server/serverApi";
import {MessengerTypeIds} from "../../types";
import {chatServerUrl} from "../../../config";
import {setSnackbar} from "../../store/appSlice";

const MessageCard = ({ message }: {message: Message}) => {
    const dispatch = useAppDispatch();

    const messengers = {
        user: useAppSelector(selectUser),
        actor: useAppSelector(selectActor),
    }
    const messenger: User|Actor = messengers[MessengerTypeIds[message.messengerTypeId]];
    const style = messenger.configuration?.colorTheme?.messageCard;

    const [deleteMessage] = useDeleteMessageMutation();
    const [updateMessage] = useUpdateMessageMutation();

    const deleteMessageHandler = async () => {
        if (typeof message.id === 'number') {
            const response =  await deleteMessage(message.id).unwrap();
            dispatch(setSnackbar({message: 'Message was successfully deleted'}));
        }
    }

    const textToSpeech = () => {
        debugger;
        // if (messenger.configuration.ttsModel) {
        //     sayText({text: message.content, model: messenger.configuration.ttsModel});
        // }
    }

    const onMessageLock = async () => {
        const updatedMessage = {
            ...message,
            isLocked: !message.isLocked,
        }
        const resp = await updateMessage(updatedMessage).unwrap();
        resp.msg && dispatch(setSnackbar({message: 'Message was successfully updated'}));
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
                <Avatar className="mobile-hidden" alt={messenger ? `${messenger.name}'s avatar` : "default avatar"} src={`${chatServerUrl}/images/${messenger.configuration?.avatar}`} sx={{ width: 100, height: 100, alignSelf: { xs: 'center', sm: 'flex-start' } }}/>
                <Stack direction={"column"} sx={{ flexGrow: 1 }}>
                    <Stack direction={"row"} sx={{ flexGrow: 1}}>
                        <Typography className="text-center-on-mobile" variant="h3" color={style.nameColor} fontFamily={"roboto"}>{messenger?.name ?? ""}</Typography>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <IconButton onClick={onMessageLock} sx={{ minWidth: '40px', '&:hover': { backgroundColor: 'rgba(255,100,100,0.2)' } }}>
                            {message.isLocked ? <LockIcon /> : <LockOpen />}
                        </IconButton>
                        <IconButton onClick={textToSpeech} sx={{ minWidth: '40px', '&:hover': { backgroundColor: 'rgba(255,100,100,0.2)' } }}>
                            <VolumeUp />
                        </IconButton>
                        <IconButton onClick={deleteMessageHandler} sx={{ minWidth: '40px', '&:hover': { backgroundColor: 'rgba(255,100,100,0.2)' } }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    {<MessageParser message={message} textColor={style.textColor ?? style.contentsColor ?? "black"} />}
                </Stack>
            </Stack>
        </Card>
    );
};

export default MessageCard;