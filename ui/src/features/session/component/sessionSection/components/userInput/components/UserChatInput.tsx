import React from 'react';
import {Box, TextField} from '@mui/material';
import useMessageInput from "../hooks/useMessageInput";
import {setSnackbar} from "../../../../../../../app/store/appSlice";
import {useAppDispatch} from "../../../../../../../store/hooks";
import UserInputFooter from "./UserInputFooter";

const UserChatInput = () => {
    const dispatch = useAppDispatch();
    const { input, onInputChange, addMessageToSession } = useMessageInput();


    const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (event.shiftKey) {
                event.preventDefault();
                return;
            }
            addMessageToSession(input).catch(_ => dispatch(setSnackbar({message: `Unable to send message`})));
        }
    }

    const onSend = async () => {
        await addMessageToSession(input);
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
                rows={10}
                onChange={(event) => onInputChange(event.target.value)}
                onKeyUp={handleKeyUp}
                sx={{ flexGrow: 1, height: '39vh' }}
            />
            <UserInputFooter onSend={onSend} />
        </Box>
    );
};

export default UserChatInput;