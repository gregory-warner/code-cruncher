import React, { useEffect, useState } from "react";
import {Box, Grid, Paper, useTheme} from "@mui/material";
import SessionScore from "./SessionScore";
import useScore from "../../../../hooks/useScore";
import { Scores } from "../../../../types";
import { useAppSelector } from "../../../../../../store/hooks";
import { selectSessionId } from "../../../../sessionSlice";

const SessionScoreBoard = () => {
    const theme = useTheme();
    const sessionId = useAppSelector(selectSessionId);

    const [score, setScore] = useState<Scores>({ correct: 0, incorrect: 0 });

    const { getScores } = useScore();

    const updateScore = async (sessionId: number): Promise<void> => {
        setScore(await getScores(sessionId));
    };

    useEffect(() => {
        if (!sessionId) {
            return;
        }

        updateScore(sessionId);
    }, [sessionId]);

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