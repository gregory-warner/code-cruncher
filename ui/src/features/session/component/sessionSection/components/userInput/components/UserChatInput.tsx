import React from 'react';
import {Box, useTheme} from '@mui/material';
import useMessageInput from "../hooks/useMessageInput";
import {setSnackbar} from "../../../../../../../app/store/appSlice";
import {useAppDispatch} from "../../../../../../../store/hooks";
import UserInputFooter from "./UserInputFooter/UserInputFooter";

const UserChatInput = () => {
    const dispatch = useAppDispatch();
    const { input, onInputChange, addMessageToSession } = useMessageInput();

    const theme = useTheme();

    const handleKeyUp = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
            <Box sx={{ flexGrow: 9, flexShrink: 0, flexBasis: '90%', border: `1px solid ${theme.palette.divider}` }}>
                <textarea
                    style={{
                        width: '100%',
                        height: '100%',
                        overflowY: 'scroll',
                        border: 'none',
                        backgroundColor: `${theme.palette.background.default}`,
                        color: `${theme.palette.text.primary}`
                    }}
                    value={input}
                    onKeyUp={handleKeyUp}
                    onChange={(event) => onInputChange(event.target.value)}
                />
            </Box>
            <Box sx={{ flexGrow: 1, flexShrink: 0, flexBasis: '10%' }}>
                <UserInputFooter onSend={onSend} />
            </Box>
        </Box>
    );
};

export default UserChatInput;