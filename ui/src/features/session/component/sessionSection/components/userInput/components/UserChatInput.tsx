import React from 'react';
import {Box, TextField} from '@mui/material';
import useMessageInput from "../hooks/useMessageInput";
import {setSnackbar} from "../../../../../../../app/store/appSlice";
import {useAppDispatch} from "../../../../../../../store/hooks";
import UserInputFooter from "./UserInputFooter";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

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
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <ReactQuill
                theme="snow"
                value={input}
                onKeyUp={handleKeyUp}
                onChange={onInputChange}
                style={{ flexGrow: 1, height: '100%' }} // Ensure it takes full height
            />
            <UserInputFooter onSend={onSend} />
        </Box>
    );
};

export default UserChatInput;