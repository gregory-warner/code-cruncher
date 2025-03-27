import React, { useEffect } from "react";
import {Box, Grid, Paper, useTheme} from "@mui/material";
import SessionScore from "./SessionScore";
import useScore from "../../../../hooks/useScore";
import {useAppDispatch, useAppSelector} from "../../../../../../store/hooks";
import {
    selectSessionId,
    selectSessionScore,
} from "../../../../sessionSlice";

const SessionScoreBoard = () => {
    const theme = useTheme();
    const dispatch = useAppDispatch();

    const sessionId = useAppSelector(selectSessionId);
    const score = useAppSelector(state => (
        sessionId ? selectSessionScore(state, sessionId) : null
    ));

    const { updateScore } = useScore();

    useEffect(() => {
        updateScore(sessionId);
    }, [sessionId]);

    if (!score) {
        return <Box></Box>;
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Paper elevation={3} sx={{ border: `5px solid ${theme.palette.background.default}`, pl: 1, pr: 1, width: '80%' }}>
                <Grid container direction='row' justifyContent='space-around'>
                    <Grid item xs={5}>
                        <SessionScore title={'Correct'} score={score.correct} color={theme.palette.primary.main} />
                    </Grid>
                    <Grid item xs={5}>
                        <SessionScore title={'Incorrect'} score={score.incorrect} color={theme.palette.error.main} />
                    </Grid>
                </Grid>
            </Paper>
        </Box>
        );
};

export default SessionScoreBoard;