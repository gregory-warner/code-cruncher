import {Message} from '../../../../../../types';
import React from 'react';
import {Box, Card, Grid} from '@mui/material';
import SessionMessageHeader from "./components/SessionMessageHeader";
import style from "../../../../style";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import SyntaxHighlighter from "react-syntax-highlighter";
import {gruvboxDark} from "react-syntax-highlighter/dist/esm/styles/hljs";

const SessionMessage = ({ message }: { message: Message }) => {

    return(
        <Card
            key={`key-message-card-${message.messageId}`}
            sx={style.sessionMessage.container}
            onClick={()=>{}}
        >
            <Grid container direction='column' >
                <SessionMessageHeader message={message} />
                <Box sx={{ pl: '0.5em', pr: '0.5em', wordBreak: 'break-word' }}>
                    <Markdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeRaw]}
                        components={{
                            code({ node, inline, className, children, ...props }: any) {
                                const match = /language-(\w+)/.exec(className || '');

                                return !inline && match ? (
                                    <SyntaxHighlighter wrapLongLines wrapLines style={gruvboxDark} PreTag="div" language={match[1]} {...props}>
                                        {String(children).replace(/\n$/, '')}
                                    </SyntaxHighlighter>
                                ) : (
                                    <code className={className} {...props}>
                                        {children}
                                    </code>
                                );
                            },
                        }}
                    >
                        {message.content}
                    </Markdown>
                </Box>
            </Grid>
        </Card>
    );
};

export default SessionMessage;