import React, {useState} from "react";
import {Grid, ListItem, TextField, Typography, useTheme} from "@mui/material";
import {useAppDispatch} from "../../../../../store/hooks";
import {setSelectedActor} from "../../../store/actorConfigurationSlice";

interface ActorItemParams {
    actor: Actor;
    itemId: number;
}

const ActorItem = ({ actor, itemId }: ActorItemParams) => {
    const theme = useTheme();

    const dispatch = useAppDispatch();

    const [editMode, setEditMode] = useState(false);
    const [editedSessionName, setEditedSessionName] = useState<string>(actor.name);

    const updateSelectedActor = () => {
        dispatch(setSelectedActor(actor));
    };

    return (
        <ListItem
            onClick={updateSelectedActor}
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
                    <Typography variant='body1'>{`${itemId+1}.) `}</Typography>
                </Grid>
                <Grid item xs={7} sx={{ paddingLeft: '5px'}}>
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
                                {actor.name}
                            </Typography>
                        )
                    }
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default ActorItem;