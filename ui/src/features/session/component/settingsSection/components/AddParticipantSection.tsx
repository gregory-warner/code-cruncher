import React, {useEffect, useState} from "react";
import {Box, Button, Grid, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {useAddParticipantMutation, useGetActorsQuery} from "../../../../../services/server/serverApi";
import {useAppDispatch, useAppSelector} from "../../../../../store/hooks";
import {selectSessionId} from "../../../sessionSlice";
import {ParticipantTypeId} from "../../../../../types";
import {setSnackbar} from "../../../../../app/store/appSlice";

const AddParticipantSection = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const [selectedActorId, setSelectedActorId] = useState(0);

    const sessionId = useAppSelector(selectSessionId);

    useEffect(() => {
        setSelectedActorId(0);
    }, [sessionId]);

    const { data, isLoading } = useGetActorsQuery();

    const [addParticipant] = useAddParticipantMutation();

    const onAddParticipant = async () => {
        if (!selectedActorId) {
            return;
        }

        const newParticipant = await addParticipant({
            sessionId,
            participantId: selectedActorId,
            participantTypeId: ParticipantTypeId.actor,
        }).unwrap();

        if (!newParticipant.participantId) {
            dispatch(setSnackbar({ message: `Unable to add new participant` }));
        }
    };

    const actors = isLoading ? [] : data;

    if (!sessionId || isLoading) {
        return <Box />;
    }

    return (
        <Grid container direction='column' alignItems='center' justifyItems='center' padding={1}>
            <Typography align='left' variant='subtitle2' sx={{width: '100%', pl: 1}}>
                Add Participant
            </Typography>
            <Grid
                container
                sx={{
                    maxHeight: 'max-content',
                    width: '95%',
                }}
                alignItems='center'
            >
                <Grid item xs={8}>
                    <Select
                        fullWidth
                        value={selectedActorId}
                        onChange={e => setSelectedActorId(e.target.value as number)}
                        displayEmpty
                        sx={{ height: theme.spacing(3) }}
                    >
                        {actors.map((actor, index) => (
                            <MenuItem value={actor.actorId} key={`id-add-participant-dropdown-item-${index}`}>
                                {actor.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={3} padding={0}>
                    <Button sx={{ p: 0 }} onClick={onAddParticipant}>
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddParticipantSection;