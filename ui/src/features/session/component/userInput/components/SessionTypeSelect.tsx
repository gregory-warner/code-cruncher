import {MenuItem, Select, SelectChangeEvent} from '@mui/material';
import React from 'react';
import useSessionTypes from "../hooks/useSessionTypes";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectSessionId, selectSessionTypeId, updateSessionStatusTypeId} from "../../../sessionSlice";
import {SessionType} from "../../../../../types";

const SessionTypeSelect = () => {
    const dispatch = useAppDispatch();

    const sessionId = useAppSelector(selectSessionId);
    const sessionTypeId = useAppSelector(state => (
        sessionId ? selectSessionTypeId(state, sessionId) : null
    ));

    const { sessionTypes } = useSessionTypes();

    const onSessionTypeChange = (event: SelectChangeEvent<any>) => {
        dispatch(updateSessionStatusTypeId({ sessionId, sessionTypeId: event.target.value }));
    };

    return (
            <Select
                labelId='message-type-label'
                id='message-type'
                placeholder='Session Type'
                value={sessionTypeId}
                onChange={onSessionTypeChange}
                sx={{ height: '2em', p: 0, minWidth: 120 }}
            >
                {
                    sessionTypes.map(item => (
                        <MenuItem key={`session-type-item-${item.value}`} value={item.value}>{item.label}</MenuItem>
                    ))
                }
            </Select>
    );
};

export default SessionTypeSelect;