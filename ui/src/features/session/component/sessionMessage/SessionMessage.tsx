import {Message} from '../../../../types';
import React from 'react';
import {Card, Grid} from '@mui/material';
import {Messenger} from '../../types';
import SessionMessageHeader from "./components/SessionMessageHeader";
import ParsedMessageContent from "./components/ParsedMessageContent";
import style from "../../style";

const SessionMessage = ({ message, messenger }: { message: Message, messenger: Messenger }) => {

    return(
        <Card
            key={`key-message-card-${message.messengerId}`}
            sx={style.sessionMessage.container}
            onClick={()=>{}}
        >
            <Grid container direction='column'>
                <SessionMessageHeader message={message} messenger={messenger} />
                <ParsedMessageContent message={message} messenger={messenger} />
            </Grid>
        </Card>
    );
};

export default SessionMessage;