import {Message} from "../../../../../../types";
import React, {useEffect, useRef} from "react";

const SessionMessageScrollFocus = ({ messages }: { messages: Message[] }) => {
    const ref = useRef<HTMLInputElement|null>(null);
    const prevLength = useRef<number>(0);

    useEffect(() => {
        if (messages.length > prevLength.current) {
            ref.current?.scrollIntoView();
        }

        prevLength.current = messages.length;
    }, [messages]);
    return <div ref={ref} />;
};

export default SessionMessageScrollFocus