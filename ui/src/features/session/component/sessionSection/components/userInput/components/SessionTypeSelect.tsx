import {Box, MenuItem, Select} from '@mui/material';
import React from 'react';
import useSessionTypes from "../hooks/useSessionTypes";
import {useAppSelector} from "../../../../../../../store/hooks";
import {selectSessionId} from "../../../../../sessionSlice";
import {useGetSessionQuery} from "../../../../../../../services/server/serverApi";
import {skipToken} from "@reduxjs/toolkit/query";

const SessionTypeSelect = () => {
    const sessionId = useAppSelector(selectSessionId);

    const { data: session, isLoading: isSessionLoading } = useGetSessionQuery(sessionId ?? skipToken);

    const { sessionTypeLabels, onSessionTypeChange } = useSessionTypes();

    if (!session || isSessionLoading) {
        return <Box />;
    }

    return (
            <Select
                labelId='message-type-label'
                id='message-type'
                placeholder='SessionSection Type'
                value={session.sessionTypeId}
                onChange={onSessionTypeChange}
                sx={{ height: '2em', p: 0, minWidth: 120 }}
            >
                {
                    sessionTypeLabels.map(item => (
                        <MenuItem key={`session-type-item-${item.value}`} value={item.value}>{item.label}</MenuItem>
                    ))
                }
            </Select>
    );
};

export default SessionTypeSelect;