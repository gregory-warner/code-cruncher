import {Snackbar} from "@mui/material";
import {selectSnackbar, setSnackbar} from "../store/appSlice";
import React from "react";
import {useAppDispatch, useAppSelector} from "../../store/hooks";

const AppSnackbar = () => {
    const dispatch = useAppDispatch();
    const snackbar = useAppSelector(selectSnackbar);

    const onClose = () => {
        dispatch(setSnackbar({message: '', isOpen: false}))
    };

    return (
        <Snackbar
            open={snackbar.isOpen}
            message={snackbar.message}
            autoHideDuration={4000}
            onClose={onClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        />
    );
};

export default AppSnackbar;