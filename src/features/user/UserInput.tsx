import React, { useState, useCallback } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { messengerTypes, selectDialogId, sendChatMessage } from '../conversation/store/conversationSlice';
import { selectUser } from './userSlice';
import './styles.css';
import { getTimestamp } from '../../utils/util';

const UserInput = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser);
    const dialogId = useAppSelector(selectDialogId);

    const [input, setInput] = useState("");

    const textStyle = {
        color: "#F8F8FF",
        backgroundColor: "rgba(34, 34, 56, 10)",
    };
    
    const onInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    }, []);

    const onSend = () => {
        if (!input) { return; }

        const message: Message = {
            dialogId: dialogId,
            messengerId: user.userId,
            messengerTypeId: messengerTypes['user'] ?? 0,
            content: input,
            timestamp: getTimestamp(),
        };

        setInput("");
        dispatch(sendChatMessage(message));
    };

    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (event.shiftKey) {
                event.preventDefault();
                return;
            }
            onSend();
        }
    }

    return(
        <Grid className="input-bar" direction={"row"} border={0} container alignContent={"center"} alignItems={"stretch"} justifyContent={"space-between"}>
            <Grid item xs={10}  borderRight={4} borderColor={"rgba(34, 34, 34, 1)"} color={"rgba(34, 34, 34, 1)"}>
                <TextField 
                    id="id-user-input" 
                    label="Question" 
                    variant="filled" 
                    color="primary"
                    multiline
                    fullWidth
                    value={input}
                    minRows={1}
                    inputProps={{ style: textStyle }}
                    onChange={onInputChange}
                    onKeyUp={handleKeyUp}
                />                
            </Grid>
            <Grid item xs={2} border={0} alignItems={"center"} color={"white"}>
                <Button 
                    className="Send-Button"
                    fullWidth 
                    variant="contained" 
                    size="large" 
                    endIcon={<SendIcon />}
                    onClick={onSend}
                >
                    Send
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserInput;