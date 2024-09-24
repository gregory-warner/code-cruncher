import {Message} from '../../../../../../types';
import React from 'react';
import {Card, Grid} from '@mui/material';
import SessionMessageHeader from "./components/SessionMessageHeader";
import ParsedMessageContent from "./components/ParsedMessageContent";
import style from "../../../../style";

const SessionMessage = ({ message }: { message: Message }) => {

    return(
        <Card
            key={`key-message-card-${message.messengerId}`}
            sx={style.sessionMessage.container}
            onClick={()=>{}}
        >
            <Grid container direction='column'>
                <SessionMessageHeader message={message} />
                <ParsedMessageContent message={message} />
            </Grid>
        </Card>
    );
};

export default SessionMessage;