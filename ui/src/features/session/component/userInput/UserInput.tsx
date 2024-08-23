import React, { useState, useCallback } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {incrementCurrentSequenceId, selectCurrentSpeaker, selectSessionId} from '../../store/sessionSlice';
import {selectUser} from "../../../user/userSlice";
import {useAddMessageMutation} from "../../../../services/server/serverApi";
import {MessageRequest} from "../../../../services/server/types";
import {MessageTypeId} from "../../../../types";
import {setSnackbar} from "../../../../app/store/appSlice";

const UserInput = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const currentSpeaker = useAppSelector(selectCurrentSpeaker);
    const sessionId = useAppSelector(selectSessionId);

    const [addMessage] = useAddMessageMutation();

    const isUserCurrentSpeaker = (
        user &&
        currentSpeaker &&
        'userId' in currentSpeaker &&
        'userId' in user &&
        user.userId === currentSpeaker.userId
    );

    const [input, setInput] = useState('');

    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }, []);

    const onSend = async () => {
        if (!input.trim() || sessionId <= 0 || user.userId <= 0) {
            return;
        }

        const message: MessageRequest = {
            sessionId,
            messengerId: user.userId,
            messageTypeId: MessageTypeId.general,
            content: input,
        };

        const newMessage = await addMessage(message).unwrap();

        if (!newMessage.messageId) {
            dispatch(setSnackbar({message: `Unable to send message`}));
            return;
        }

        dispatch(incrementCurrentSequenceId());

        setInput("");
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (event.shiftKey) {
                event.preventDefault();
                return;
            }
            onSend().catch(_ => dispatch(setSnackbar({message: `Unable to send message`})));
        }
    }

    return(
        <Grid direction={"column"} container alignContent={"center"} alignItems={"stretch"} justifyContent={"space-between"} sx={{height: '100%', border: '1px solid black'}}>
            <Grid item xs={11}  borderRight={4} borderColor={"rgba(34, 34, 34, 1)"} color={"rgba(34, 34, 34, 1)"} sx={{width: '100%'}}>
                <TextField 
                    id="id-user-input" 
                    label="Message"
                    variant="filled" 
                    color="primary"
                    multiline
                    fullWidth
                    value={input}
                    minRows={12}
                    onChange={onInputChange}
                    onKeyUp={handleKeyUp}
                    disabled={!isUserCurrentSpeaker}
                />                
            </Grid>
            <Grid container alignItems={'center'} spacing={2}>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={3}></Grid>
                <Grid container item xs={3} textAlign={'right'} alignItems={'center'} justifyContent={'flex-end'} padding={0.1}>
                    <Button
                        variant="contained"
                        size="small"
                        endIcon={<SendIcon />}
                        onClick={onSend}
                    >
                        Send
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default UserInput;