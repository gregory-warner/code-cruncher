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
            <Box sx={{ flexGrow: 9, flexShrink: 0, flexBasis: '90%', overflowY: 'auto' }}>
                <ReactQuill
                    theme="snow"
                    value={input}
                    onKeyUp={handleKeyUp}
                    onChange={onInputChange}
                    style={{ height: '88%' }}
                />
            </Box>
            <Box sx={{ flexGrow: 1, flexShrink: 0, flexBasis: '10%' }}>
                <UserInputFooter onSend={onSend} />
            </Box>
        </Box>
    );
};

export default UserChatInput;