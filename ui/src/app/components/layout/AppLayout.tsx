import React, {ReactNode, useEffect} from "react";
import {useAppDispatch} from "../../../store/hooks";
import {useGetUserQuery} from "../../../services/server/serverApi";
import {defaultUserId, setUser} from "../../../features/user/userSlice";
import {CircularProgress, Grid} from "@mui/material";
import style from './styles';
import AppHeader from "./header/AppHeader";
import {isUser} from "../../../utils/util";

interface CodeCruncherLayoutProps {
    leftPanel: ReactNode;
    center: ReactNode;
    rightPanel: ReactNode;
}

const AppLayout = ({ leftPanel, center, rightPanel }: CodeCruncherLayoutProps) => {
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
                <Grid item xs={2} sx={style.leftPanel}>
                    {leftPanel}
                </Grid>

                <Grid container item xs={8} direction="column" sx={style.centerPanel}>
                    {center}
                </Grid>

                <Grid item xs={2} sx={style.rightPanel}>
                    {rightPanel}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default AppLayout;