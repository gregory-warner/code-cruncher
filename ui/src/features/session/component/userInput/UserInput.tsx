import React, { useState, useCallback } from 'react';
import {Box, Button, TextField} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import {useAppDispatch, useAppSelector} from '../../../../store/hooks';
import {incrementCurrentSequenceId, selectCurrentSpeaker, selectSessionId} from '../../store/sessionSlice';
import {selectUser} from "../../../user/userSlice";
import {useAddMessageMutation} from "../../../../services/server/serverApi";
import {AddMessageRequest} from "../../../../services/server/types";
import {MessageTypeIds, MessengerTypeIds} from "../../../../types";
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

        const message: AddMessageRequest = {
            sessionId,
            messengerId: user.userId,
            messageTypeId: MessageTypeIds.general,
            messengerTypeId: MessengerTypeIds.user,
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
        <Box>
            <TextField
                id="id-user-input"
                label="Message"
                variant="filled"
                color="primary"
                multiline
                fullWidth
                value={input}
                rows={9}
                onChange={onInputChange}
                onKeyUp={handleKeyUp}
                disabled={!isUserCurrentSpeaker}
                sx={{ flexGrow: 1 }}
            />
            <Button
                variant="contained"
                size="small"
                endIcon={<SendIcon />}
                onClick={onSend}
            >
                Send
            </Button>
        </Box>
    );
};

export default UserInput;