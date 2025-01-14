import {Editor} from "@monaco-editor/react";
import {useAppSelector} from "../../../../../../../store/hooks";
import {selectMode} from "../../../../../../../theme/themeSlice";
import React from "react";
import {Box} from "@mui/material";
import useMessageInput from "../hooks/useMessageInput";
import UserInputFooter from "./UserInputFooter/UserInputFooter";
import {useLazyGetSessionQuery} from "../../../../../../../services/server/serverApi";
import {selectSessionId} from "../../../../../sessionSlice";
import {SessionType} from "../../../../../../../types";

const UserCodeInput = ({ language } : { language: string }) => {
    const sessionId = useAppSelector(selectSessionId);

    const themeMode = useAppSelector(selectMode);

    const { input, onInputChange, addMessageToSession } = useMessageInput();

    const [getSession] = useLazyGetSessionQuery();

    const onSend = async () => {
        const session = await getSession(sessionId).unwrap();
        const sessionType = SessionType[session.sessionTypeId]?.toLowerCase() ?? '';

        const content = `\`\`\`${sessionType}\n${input}\n\`\`\``;
        await addMessageToSession(content);
    }

    return (
        <Box >
            <Editor
                height="39vh"
                theme={themeMode === 'dark' ? 'vs-dark' : themeMode}
                language={language}
                defaultValue="// Enter your answer below:"
                value={input}
                onChange={onInputChange}
            />
            <UserInputFooter onSend={onSend} />
        </Box>
    );
};

export default UserCodeInput;