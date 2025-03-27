import {Button, Grid, useTheme} from "@mui/material";
import React from "react";

export interface ActionsSectionButtonProps {
    title: string;
    disabled?: boolean;
    startIcon: React.ReactNode;
    onClick: () => void;
}

const ActionsSectionButton = ({ title, startIcon, onClick, disabled = false }: ActionsSectionButtonProps) => {
    const theme = useTheme();

    return (
        <Grid container item xs={12} justifyContent="center" p={1} sx={{ color: theme.palette.secondary.main }}>
            <Button
                fullWidth
                variant="outlined"
                color="secondary"
                startIcon={startIcon}
                disabled={disabled}
                onClick={onClick}
            >
                {title}
            </Button>
        </Grid>
    );
};

export default ActionsSectionButton;