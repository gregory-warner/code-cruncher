import {Avatar, Grid, IconButton, Typography} from "@mui/material";
import {chatServerUrl} from "../../../../../../../../config";
import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import {Message, MessengerType} from "../../../../../../../types";
import {useAppDispatch} from "../../../../../../../store/hooks";
import {useDeleteMessageMutation} from "../../../../../../../services/server/serverApi";
import {setSnackbar} from "../../../../../../../app/store/appSlice";
import style from "../../../../../style";
import useMessageCardStyle from "../../../../../hooks/useMessageCardStyle";

const SessionMessageHeader = ({ message }: { message: Message }) => {
    const dispatch = useAppDispatch();

    const [deleteMessage] = useDeleteMessageMutation();

    const messenger: MessengerType = message.messenger;

    const { cardStyle } = useMessageCardStyle({message});

    const deleteMessageHandler = async () => {
        await deleteMessage(message.messageId).unwrap();
        dispatch(setSnackbar({message: 'Message was successfully deleted'}));
    };

    return (
        <Grid direction='row' item container justifyContent='space-between' alignItems='center'>
            <Grid xs={4} item container direction='row' justifyContent='flex-start' alignItems='center'>
                <Grid item>
                    <Avatar
                        alt={`${messenger.name}'s avatar`}
                        src={`${chatServerUrl}/images/${messenger.avatar}`}
                        sx={style.sessionMessage.header.avatar}
                    />
                </Grid>
                <Grid item>
                    <Typography
                        variant='h6'
                        color={cardStyle.nameColor}
                        fontFamily={style.sessionMessage.font}
                    >
                        {messenger.name}
                    </Typography>
                </Grid>
            </Grid>
            <Grid xs={2} item container justifyContent='flex-end'>
                <Grid item>
                    <IconButton onClick={deleteMessageHandler} sx={style.sessionMessage.header.icon}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default SessionMessageHeader;