import React, {useState} from "react";
import {Grid, IconButton, ListItem, TextField, Typography, useTheme} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import {useDeleteDialogMutation, useUpdateDialogNameMutation} from "../../../services/server/serverApi";
import {Dialog} from "../../../types";
import {setDialogId} from "../../conversation/store/conversationSlice";
import {useAppDispatch} from "../../../store/hooks";

const SessionItem = ({sessionId, session}) => {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState(false);
    const [editedSessionName, setEditedSessionName] = useState<string>(session.dialogName);

    const [deleteDialog] = useDeleteDialogMutation();
    const [updateDialogName] = useUpdateDialogNameMutation();

    const deleteSession = () => {
        deleteDialog(session.dialogId);
    };

    const editSessionName = () => {
        if (editMode) {
            updateDialogName({dialogName: editedSessionName, dialogId: session.dialogId});
        }

        setEditMode(!editMode);
    };

    const updateCurrentDialogSession = (session: Dialog) => {
        dispatch(setDialogId(session.dialogId));
    };

    return (
        <ListItem
            onClick={() => updateCurrentDialogSession(session)}
            sx={{
                width: '95%',
                textTransform: 'none',
                color: 'inherit',
                '&:hover': { cursor: 'pointer' },
                '&:hover:before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    outlineOffset: '-1px',
                    transition: 'border-color .3s, box-shadow .3s',
                    boxShadow: `0 0 10px ${theme.palette.primary.main}`,
                },
            }}
        >
            <Grid container alignItems='center' sx={{ flexGrow: 1}}>
                <Grid item xs={1}>
                    <Typography variant='body1'>{`${sessionId+1}.) `}</Typography>
                </Grid>
                <Grid item xs={7}>
                    {
                        editMode ? (
                            <TextField
                                value={editedSessionName}
                                onChange={(e) => setEditedSessionName(e.target.value)}
                                size="small"
                            />
                        ) : (
                            <Typography
                                whiteSpace='nowrap'
                                overflow='hidden'
                                textOverflow='ellipsis'
                                paddingLeft='3px'
                                align='left'
                                variant='body1'
                            >
                                {session.dialogName}
                            </Typography>
                        )
                    }
                </Grid>
                <Grid item xs={2}>
                    <IconButton aria-label={editMode ? 'save' : 'edit'} onClick={editSessionName}>
                        {editMode ? <SaveIcon /> : <EditIcon />}
                    </IconButton>
                </Grid>
                <Grid item xs={2}>
                    <IconButton aria-label="delete" onClick={deleteSession}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default SessionItem;