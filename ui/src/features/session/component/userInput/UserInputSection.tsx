import React from 'react';
import {Box} from '@mui/material';
import {useAppSelector} from '../../../../store/hooks';
import {selectSessionId} from '../../store/sessionSlice';
import {useGetSessionQuery} from "../../../../services/server/serverApi";
import {SessionType} from "../../../../types";
import {skipToken} from "@reduxjs/toolkit/query";
import UserCodeInput from "./components/UserCodeInput";
import UserChatInput from "./components/UserChatInput";

const UserInputSection = () => {
    const sessionId = useAppSelector(selectSessionId);

    const { data: session, isLoading: isSessionLoading } = useGetSessionQuery(sessionId ?? skipToken);

    return(
        <Box>
            {
                isSessionLoading || session?.sessionTypeId === SessionType.code ? (
                    <UserCodeInput />
                ) : (
                    <UserChatInput  />
                )
            }
        </Box>
    );
};

export default UserInputSection;