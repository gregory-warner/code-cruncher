import React from "react";
import {useStopwatch} from "react-timer-hook";
import {Grid, IconButton, Typography} from "@mui/material";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

const SessionTimer = () => {
    const {
        seconds,
        minutes,
        hours,
        isRunning,
        start,
        pause,
        reset,
    } = useStopwatch();

    return (
        <Grid container direction="row" alignItems="center" spacing={2}>
            <Grid item>
                {isRunning ? (
                    <IconButton color="primary" onClick={pause}>
                        <PauseIcon />
                    </IconButton>
                ) : (
                    <IconButton color="primary" onClick={start}>
                        <PlayArrowIcon />
                    </IconButton>
                )}
            </Grid>
            <Grid item>
                <Typography variant="h4" component="div">
                    {`${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
                </Typography>
            </Grid>
            <Grid item>
                <IconButton color="secondary" onClick={() => reset(null, false)}>
                    <RestartAltIcon />
                </IconButton>
            </Grid>
        </Grid>
    );
};

export default SessionTimer;