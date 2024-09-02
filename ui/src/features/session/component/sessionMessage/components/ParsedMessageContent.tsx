import {Message, MessageCard, MessageContentTypes} from "../../../../../types";
import {Messenger} from "../../../types";
import {getParsedMessageSections} from "../../../util";
import he from 'he';
import {Grid, Typography} from "@mui/material";
import SyntaxHighlighter from "react-syntax-highlighter";
import {a11yDark} from "react-syntax-highlighter/dist/esm/styles/hljs";
import React from "react";
import style from "../../../style";

const ParsedMessageContent = ({ message, messenger }: { message: Message, messenger: Messenger }) => {
    const cardStyle: MessageCard = messenger.colorTheme.messageCard;

    const parsedMessageSections = getParsedMessageSections(he.decode(message.content));

    return (
        <Grid item padding={1}>
            {parsedMessageSections.map((section, index) => {
                if (section.type === MessageContentTypes.general) {
                    return <Typography
                        key={`session-message-${message.messageId}-${index}`}
                        sx={style.sessionMessage.content.general}
                        align={'left'}
                        variant='subtitle1'
                        color={cardStyle.textColor}
                        fontFamily={style.sessionMessage.font}
                    >
                        { he.decode(section.content) }
                    </Typography>;
                }
                return <SyntaxHighlighter
                    key={`session-message-${message.messageId}-${index}`}
                    customStyle={style.sessionMessage.content.code}
                    language={section.lang}
                    style={a11yDark}
                    wrapLines
                    lineProps={{ style: { wordBreak: 'break-all', whiteSpace: 'pre-wrap' } }}
                >
                    {section.content}
                </SyntaxHighlighter>;
            })}
        </Grid>
    );
};

export default ParsedMessageContent;