import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Typewriter from 'typewriter-effect';
import {messengerTypes, selectMessages} from '../conversation/store/conversationSlice';
import he from 'he';
import {marked} from 'marked';
import {useAppSelector} from "../../store/hooks";

interface MessageParserProps {
    message: Message,
}

const MessageParser = ({ message }: MessageParserProps): JSX.Element => {
    const pattern = /```(\w+)?\n([\s\S]*?)```/g;
    const [parsedContents, setParsedContents] = useState<{type: string, msg: string}[]>([]);
    const [displayContents, setDisplayContents] = useState([]);
    const [currentIdx, setCurrentIdx] = useState(-1);

    const messages = useAppSelector(selectMessages);
    const lastMessage = messages[messages.length-1];

    useEffect(() => {
        if (parsedContents.length > 0) {
            return;
        }

        const messageContents = he.decode(message.content);
        const matches = [...messageContents.matchAll(pattern)];
        const result = [];

        let currentIndex = 0;
          
        for (const match of matches) {
            if (typeof match.index === "undefined") {
                continue;
            } 
            const [fullMatch, type, msg] = match;
          
            const before = messageContents.slice(currentIndex, match.index);
          
            if (before.trim().length > 0) {
                result.push({ type: "general", msg: before.trim() });
            }
          
            result.push({ type: type ?? "code", msg: msg.trim() });
          
            currentIndex = match.index + fullMatch.length;
        }
        
        const last = messageContents.slice(currentIndex);
        
        if (last.trim().length > 0) {
            result.push({ type: "general", msg: last.trim() });
        }

        setParsedContents(result);
        setCurrentIdx(0);
    }, [message]);

    const setTypeWriterDisplayContents = async () => {
        let currentContent = parsedContents[currentIdx];

        if (currentContent.type === "general") {
            currentContent.msg = await marked(currentContent.msg);
            const formattedMessage = currentContent.msg.replace(new RegExp("\r?\n", "g"), "<br>");

            setDisplayContents([
                ...displayContents,
                <Typewriter
                    key={`id-message-general-${currentIdx}`}
                    onInit={(typewriter) => {
                        typewriter.changeDelay(15)
                        .typeString(formattedMessage)
                        .callFunction(() => setCurrentIdx(currentIdx+1))
                        .start();
                    }}
                    options={{ cursor: "" }}
                />
            ]);
        } else {
            setDisplayContents([
                ...displayContents,
                <SyntaxHighlighter 
                    key={`id-message-code-${currentIdx}`} 
                    customStyle={{backgroundColor: "black", borderRadius: "5px"}} 
                    language={currentContent.type} 
                    style={a11yDark}
                    wrapLines
                    lineProps={{style: {wordBreak: "break-all", whiteSpace: "pre-wrap"}}}
                    >
                        {currentContent.msg}
                </SyntaxHighlighter>,
            ]);
            setCurrentIdx(currentIdx+1);
        }
    }

    useEffect(() => {
        if (currentIdx < 0 || currentIdx >= parsedContents.length || currentIdx !== displayContents.length) {
            return;
        }

        const messengerType = messengerTypes[message.messengerTypeId];


        if (messengerType === "user" || message.id !== lastMessage.id) {
            setStaticDisplayContents();
        } else if (messengerType === "assistant") {
            setTypeWriterDisplayContents();
        }
    }, [parsedContents, currentIdx]);

    const setStaticDisplayContents = () => {
        setDisplayContents(parsedContents.map((content, idx) => {
            if (content.type === "general") {
                return <Typography 
                    key={`id-message-general-${idx}`}
                    sx={{whiteSpace: "pre-wrap", wordWrap: "break-word"}} 
                    align={"left"} 
                    variant="h4" 
                    color={"black"} 
                    fontFamily={"roboto"}
                    >
                        {he.decode(content.msg)}
                </Typography>;
            } else {
                return <SyntaxHighlighter 
                    key={`id-message-code-${idx}`} 
                    customStyle={{backgroundColor: "black", borderRadius: "5px"}} 
                    language={content.type} 
                    style={a11yDark}
                    wrapLines
                    lineProps={{style: {wordBreak: "break-all", whiteSpace: "pre-wrap"}}}
                    >
                        {content.msg}
                </SyntaxHighlighter>;
            }
        }));
    }

    return (<div>{displayContents}</div>);
};

export default MessageParser;
