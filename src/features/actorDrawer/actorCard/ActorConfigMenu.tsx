import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ConstructionIcon from '@mui/icons-material/Construction';
import { Fragment, useState } from "react";
import { Backspace } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteCurrentDialog, selectDialogId, setMessages } from "../../conversation/store/conversationSlice";
import { setActorConfigDrawerOpen } from "../../actorConfigDrawer/store/actorConfigDrawerSlice";
import { setDrawerOpen } from "../ActorDrawerSlice";
import { useDeleteDialogMutation } from "../../../services/server/serverApi";

const ActorConfigMenu = () => {
    const dispatch = useAppDispatch();
    const dialogId = useAppSelector(selectDialogId);

    const [deleteDialog] = useDeleteDialogMutation();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const clearConversation = () => {
        deleteDialog(dialogId);
        handleClose();
    };

    const toggleConfigDrawer = () => {
        console.log('A config drawer');
        dispatch(setDrawerOpen(false));
        dispatch(setActorConfigDrawerOpen(true));
    };

    return (
        <Fragment>
            <IconButton onClick={handleClick}>
                <MoreVertIcon />
            </IconButton>
            <Menu
                id="id-actor-card-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
            >
                <MenuItem onClick={toggleConfigDrawer}><ConstructionIcon /><Typography paddingLeft={1}>Configuration</Typography></MenuItem>
                <MenuItem onClick={clearConversation}><Backspace /><Typography paddingLeft={1}>Clear Conversation</Typography></MenuItem>
            </Menu>
        </Fragment>
    );
};

export default ActorConfigMenu;