import {Message} from "../../../../types";
import React from "react";
import {useAppDispatch} from "../../../../store/hooks";
import {useDeleteMessageMutation, useUpdateMessageMutation} from "../../../../services/server/serverApi";
import {setSnackbar} from "../../../../app/store/appSlice";
import {Avatar, Card, IconButton, Stack, Typography} from "@mui/material";
import {Box} from "@mui/system";
import LockIcon from "@mui/icons-material/Lock";
import {LockOpen} from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import {chatServerUrl} from "../../../../../config";
import {Messenger} from "../../types";

const SessionMessage = ({ message, messenger }: { message: Message, messenger: Messenger }) => {
    const dispatch = useAppDispatch();

    const [deleteMessage] = useDeleteMessageMutation();
    const [updateMessage] = useUpdateMessageMutation();

    const deleteMessageHandler = async () => {
        await deleteMessage(message.messageId).unwrap();
        dispatch(setSnackbar({message: 'Message was successfully deleted'}));
    }

    const onMessageLock = async () => {
        const updatedMessage = {
            ...message,
            isLocked: !message.isLocked,
        }
        const resp = await updateMessage(updatedMessage).unwrap();
        if (resp.messageId) {
            dispatch(setSnackbar({message: 'Message was successfully updated'}));
        }
    }

    return(
        <Card
            key={`key-message-card-${message.messengerId}`}
            sx={{ width: '100%' }}
            onClick={()=>{}}
        >
            <Stack direction={{ xs: "column", sm: "row" }} spacing={4} border={16} borderColor={'black'} sx={{ display: "flex", alignItems: "center"  }}>
                <Avatar className="mobile-hidden" alt={`${messenger.name}'s avatar`} src={`${chatServerUrl}/images/${messenger.avatar}`} sx={{ width: 100, height: 100, alignSelf: { xs: 'center', sm: 'flex-start' } }}/>
                <Stack direction={"column"} sx={{ flexGrow: 1 }}>
                    <Stack direction={"row"} sx={{ flexGrow: 1}}>
                        <Typography className="text-center-on-mobile" variant="h3" color={'black'} fontFamily={"roboto"}>{messenger.name}</Typography>
                        <Box sx={{ flexGrow: 1 }}></Box>
                        <IconButton onClick={onMessageLock} sx={{ minWidth: '40px', '&:hover': { backgroundColor: 'rgba(255,100,100,0.2)' } }}>
                            {message.isLocked ? <LockIcon /> : <LockOpen />}
                        </IconButton>
                        <IconButton onClick={deleteMessageHandler} sx={{ minWidth: '40px', '&:hover': { backgroundColor: 'rgba(255,100,100,0.2)' } }}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                    {message.content}
                    {/*{<MessageParser message={message} textColor={style.textColor ?? style.contentsColor ?? "black"} />}*/}
                </Stack>
            </Stack>
        </Card>
    );
};

export default SessionMessage;