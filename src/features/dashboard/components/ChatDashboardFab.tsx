import {SpeedDial, SpeedDialAction} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {Add, Delete, Edit} from "@mui/icons-material";

const ChatDashboardFab = () => {
    const [isFabOpen, setFabOpen] = useState(false);

    const handleFabClick = () => {
        setFabOpen((prevOpen) => !prevOpen);
    };

    const handleCreateNewClick = () => {
        setFabOpen(false);
        // Call your logic to open the drawer here
        // e.g., openDrawer();
    };

    return (
        <Box style={{ position: 'relative', height: '100vh' }}>
            <SpeedDial
                ariaLabel="SpeedDial"
                icon={<Add />}
                open={isFabOpen}
                onClick={handleFabClick}
                direction="up"

                sx={{
                    position: 'fixed',
                    bottom: 20,
                    right: 20,
                }}
            >
                <SpeedDialAction
                    icon={<Add />}
                    tooltipTitle="Create New"
                    onClick={handleCreateNewClick}
                />
                <SpeedDialAction icon={<Edit />} tooltipTitle="Edit" />
                <SpeedDialAction icon={<Delete />} tooltipTitle="Delete" />
            </SpeedDial>
        </Box>
    );
};

export default ChatDashboardFab;