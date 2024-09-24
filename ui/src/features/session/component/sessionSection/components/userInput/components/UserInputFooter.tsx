import {Box, Button} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import SessionTypeSelect from "./SessionTypeSelect";

interface UserInputFooterProps {
    onSend: () => void;
}

const UserInputFooter = ({ onSend }: UserInputFooterProps) => {
    return (
        <Box sx={{ height: '5vh', display: 'flex', alignItems: 'center' }}>
            <SessionTypeSelect />
            <Box sx={{ flexGrow: 1 }}></Box>
            <Button variant="contained" size="small" endIcon={<SendIcon />} onClick={onSend}>
                Send
            </Button>
        </Box>
    );
};

export default UserInputFooter;