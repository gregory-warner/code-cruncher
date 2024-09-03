import {CircularProgress, Grid} from '@mui/material';
import AppHeader from './components/header/AppHeader';
import style from './styles';
import SessionsSection from "../sessionsSection/SessionsSection";
import {useGetUserQuery} from "../../services/server/serverApi";
import React, {useEffect} from "react";
import {useAppDispatch} from "../../store/hooks";
import {defaultUserId, setUser} from "../user/userSlice";
import {isUser} from "../../utils/util";
import Session from "../session/Session";
import UserInput from "../session/component/userInput/UserInput";
import DetailsSection from "../detailsSection/DetailsSection";
import UserCodeInput from "../session/component/userInput/UserCodeInput";

const CodeCruncherApp = () => {
    const dispatch = useAppDispatch();

    const { data: userData, isLoading: isUserDataLoading } = useGetUserQuery(defaultUserId);

    useEffect(() => {
        if (isUser(userData)) {
            dispatch(setUser(userData));
        }
    }, [userData]);

    if (isUserDataLoading) {
        return (
            <CircularProgress
                aria-label="Loading user..."
            />
        );
    }

    return (
        <Grid container direction="column" sx={{ overflowY: "hidden",}}>
            <Grid item xs={12} sx={style.header}>
                <AppHeader />
            </Grid>

            <Grid container item xs={12} direction="row" sx={style.main}>
                <Grid item xs={2} sx={style.sessionsSection}>
                    <SessionsSection />
                </Grid>

                <Grid container direction="column" sx={style.sessionContainer}>
                    <Grid item sx={style.sessionMessageContainer}>
                        <Session />
                    </Grid>
                    <Grid container direction='column' item sx={style.userInputContainer}>
                        <UserCodeInput />
                    </Grid>
                </Grid>

                <Grid item xs={2} sx={style.details}>
                    <DetailsSection />
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CodeCruncherApp;