import {MenuItem, Select} from '@mui/material';
import React from 'react';
import {useAppSelector} from '../../../../../store/hooks';
import {selectSessionId} from '../../../sessionSlice';
import useSessionTypes from "../hooks/useSessionTypes";

const SessionTypeSelect = () => {
    const sessionId = useAppSelector(selectSessionId);
    const types = useSessionTypes();

    return (
            <Select
                labelId='message-type-label'
                id='message-type'
                placeholder='Session Type'
                value={0}
                // onChange={(e) => setMessageType(e.target.value as string)}
                sx={{ height: '2em', p: 0, minWidth: 120 }}
            >
                {
                    types.messageTypeItems.map(item => (
                        <MenuItem key={`session-type-item-${item.value}`} value={item.value}>{item.label}</MenuItem>
                    ))
                }
            </Select>
    );
};

export default SessionTypeSelect;