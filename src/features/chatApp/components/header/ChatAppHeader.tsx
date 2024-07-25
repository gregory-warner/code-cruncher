import React from 'react';
import ListTwoTone from '@mui/icons-material/ListTwoTone';
import {Box, IconButton, Typography, useTheme} from '@mui/material';
import { toggleDrawer } from '../../../actorDrawer/ActorDrawerSlice';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import {selectActor} from "../../../conversation/store/conversationSlice";

const ChatAppHeader: React.FC = () => {
    const dispatch = useAppDispatch();
    const assistant = useAppSelector(selectActor);
    const theme = useTheme();

    return (
        <Box sx={{maxHeight: '8vh'}} display={"flex"} justifyContent={"space-between"} alignItems={"center"} bgcolor="rgba(34, 34, 34, 0.9)">
            <Box display="flex" alignItems="center">
                <Box>
                    <IconButton onClick={() => dispatch(toggleDrawer())}>
                        <ListTwoTone />
                    </IconButton>
                </Box>
            </Box> 
            <Box display="flex" alignItems="center" sx={{paddingRight: 4}}>
                <Typography color={theme.palette.text.primary} variant={"h4"}>{assistant?.name ?? ""}</Typography>
            </Box>
        </Box>
    );
};

export default ChatAppHeader;