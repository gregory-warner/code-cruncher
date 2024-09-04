import {Box, Button} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import React from "react";

interface UserInputFooterInput {
    onSend: () => void;
}

const UserInputFooter = ({ onSend }: UserInputFooterInput) => {
    return (
        <Box sx={{ height: '5vh' }}>
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

export default UserInputFooter;