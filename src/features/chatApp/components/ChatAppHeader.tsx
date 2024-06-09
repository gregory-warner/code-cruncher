import ListTwoTone from '@mui/icons-material/ListTwoTone';
import { Box, IconButton, Typography } from '@mui/material';
import { toggleDrawer } from '../../actorDrawer/ActorDrawerSlice';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAssistant } from '../../actor/actorSlice';
import './chatAppHeaderStyle.css';

const ChatAppHeader = (): JSX.Element => {
    const dispatch = useAppDispatch();
    const assistant = useAppSelector(selectAssistant);

    return (
        <Box className="header" height={0} display={"flex"} justifyContent={"space-between"} alignItems={"center"} bgcolor="rgba(34, 34, 34, 0.9)">
            <Box display="flex" alignItems="center" sx={{zIndex: "1"}}>
                <Box className="button-container">
                    <IconButton className="button" onClick={() => dispatch(toggleDrawer())}>
                        <ListTwoTone sx={{ width: "40px", height: "40px" }}/>
                    </IconButton>
                </Box>
            </Box> 
            <Box display="flex" alignItems="center" sx={{paddingRight: 4}}>
                <Typography className="name-text" variant={"h4"}>{assistant?.name ?? ""}</Typography>
            </Box>
        </Box>
    );
};

export default ChatAppHeader;