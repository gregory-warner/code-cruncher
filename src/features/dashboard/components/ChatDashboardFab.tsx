import {SpeedDial} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import {Add} from "@mui/icons-material";
import {useAppDispatch} from "../../../store/hooks";
import {
    setIsActorCreationDrawerOpen
} from "../../actorCreationDrawer/store/actorCreationDrawerSlice";
import {setSelectedActor} from "../chatDashboardSlice";

const ChatDashboardFab = () => {

    const dispatch = useAppDispatch();

    const handleFabClick = () => {
        dispatch(setSelectedActor(null));
        dispatch(setIsActorCreationDrawerOpen(true));
    };

    return (
        <Box style={{ position: 'relative', height: '100vh' }}>
            <SpeedDial
                ariaLabel="SpeedDial"
                icon={<Add />}
                onClick={handleFabClick}
                direction="up"

                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                }}
            >
            </SpeedDial>
        </Box>
    );
};

export default ChatDashboardFab;