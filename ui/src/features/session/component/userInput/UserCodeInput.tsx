import {Editor} from "@monaco-editor/react";
import {useAppSelector} from "../../../../store/hooks";
import {selectMode} from "../../../../theme/themeSlice";
import React from "react";
import {Box} from "@mui/material";

const UserCodeInput = () => {

    const themeMode = useAppSelector(selectMode);

    return (
        <Box>
            <Editor
                height="40vh"
                theme={themeMode === 'dark' ? 'vs-dark' : themeMode}
                defaultLanguage="javascript"
                defaultValue="// Enter your answer below:"
            />
        </Box>
    );
};

export default UserCodeInput;