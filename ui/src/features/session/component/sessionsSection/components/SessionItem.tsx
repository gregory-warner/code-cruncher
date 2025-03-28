import React, {useEffect, useState} from "react";
import {Grid, IconButton, ListItem, TextField, Typography, useTheme} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import {Session} from "../../../../../types";
import {useDeleteSessionMutation, useUpdateSessionNameMutation} from "../../../../../services/server/serverApi";
import useSessionUpdater from "../../../hooks/useSessionUpdater";
import logger from "../../../../../../log/logger";

interface SessionItemParams {
    sessionId: number;
    session: Session;
}

const SessionItem = ({ sessionId, session }: SessionItemParams) => {
    const theme = useTheme();

    const [editMode, setEditMode] = useState(false);
    const [editedSessionName, setEditedSessionName] = useState<string>(session.sessionName);

    const { updateSession, deleteSessionById } = useSessionUpdater();

    useEffect(() => {
        setEditedSessionName(session.sessionName);
    }, [editMode]);

    const [updateSessionName] = useUpdateSessionNameMutation();

    const editSessionName = () => {
        if (editMode) {
            updateSessionName({sessionName: editedSessionName, sessionId: session.sessionId});
        }
        setEditMode(!editMode);

    };

    const onEdit = (e) => {
        setEditedSessionName(e.target.value);
    };

    const onKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            if (event.shiftKey) {
                event.preventDefault();
                return;
            }

            editSessionName();
        }
    }

    const onClear = () => {
        if (editMode) {
            setEditMode(false);
            return;
        }

        deleteSessionById(session.sessionId);
    };

    return (
        <ListItem
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
            onClick={() => updateSession(session)}
        >
            <Grid container alignItems='center' sx={{ flexGrow: 1}}>
                <Grid item xs={1}>
                    <Typography variant='body1'>{`${sessionId+1}.) `}</Typography>
                </Grid>
                <Grid item xs={7} sx={{ paddingLeft: '5px'}}>
                    {
                        editMode ? (
                            <TextField
                                value={editedSessionName}
                                onChange={onEdit}
                                onKeyUp={onKeyUp}
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
                                {session.sessionName}
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
                    <IconButton aria-label="delete" onClick={onClear}>
                        {editMode && <CloseIcon /> }
                    </IconButton>
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default SessionItem;