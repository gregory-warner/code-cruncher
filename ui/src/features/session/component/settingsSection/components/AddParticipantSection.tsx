import React, {useState} from "react";
import {Box, Button, Grid, MenuItem, Select, Typography, useTheme} from "@mui/material";
import {useGetActorsQuery} from "../../../../../services/server/serverApi";

const AddParticipantSection = () => {
    const theme = useTheme();

    const { data: actors } = useGetActorsQuery();

    const [selectedActorId, setSelectedActorId] = useState(0);

    if (!actors) {
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
                        {actors.map(actor => (
                            <MenuItem value={actor.actorId}>
                                {actor.name}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={3} padding={0}>
                    <Button sx={{ p: 0 }}>
                        Add
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AddParticipantSection;