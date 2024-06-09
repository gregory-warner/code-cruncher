import {SpeedDial, SpeedDialAction} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import {Add, Delete, Edit} from "@mui/icons-material";

const ChatAppFab: React.FC = () => {
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
                FabProps={{
                    style: {
                        position: 'fixed',
                        bottom: 100,
                        right: 40,
                    },
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

export default ChatAppFab;