import {Editor} from "@monaco-editor/react";
import {useAppSelector} from "../../../../../store/hooks";
import {selectMode} from "../../../../../theme/themeSlice";
import React from "react";
import {Box} from "@mui/material";
import useMessageInput from "../hooks/useMessageInput";
import UserInputFooter from "./UserInputFooter";

const UserCodeInput = () => {

    const themeMode = useAppSelector(selectMode);

    const { input, onInputChange, addMessageToSession } = useMessageInput();

    const onSend = async () => {
        const content = `\`\`\`\n${input}\n\`\`\``;
        await addMessageToSession(content);
    }

    return (
        <Box >
            <Editor
                height="39vh"
                theme={themeMode === 'dark' ? 'vs-dark' : themeMode}
                defaultLanguage="javascript"
                defaultValue="// Enter your answer below:"
                value={input}
                onChange={onInputChange}
            />
            <UserInputFooter onSend={onSend} />
        </Box>
    );
};

export default UserCodeInput;