import {Button, Grid} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import React from 'react';
import SessionTypeSelect from "../SessionTypeSelect";
import SessionTimer from "./SessionTimer";

interface UserInputFooterProps {
    onSend: () => void;
}

const UserInputFooter = ({ onSend }: UserInputFooterProps) => {
    return (
        <Grid container alignItems="center" spacing={2}>
            <Grid item xs={4}>
                <SessionTypeSelect />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="center">
                <SessionTimer />
            </Grid>
            <Grid item xs={4} display="flex" justifyContent="flex-end">
                <Button variant="contained" size="small" endIcon={<SendIcon />} onClick={onSend}>
                    Send
                </Button>
            </Grid>
        </Grid>
    );
};

export default UserInputFooter;