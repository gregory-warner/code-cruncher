import {Grid, Select, SelectChangeEvent, useTheme} from "@mui/material";
import React from "react";

interface ActionsSectionDropdownProps {
    value: any;
    items: JSX.Element[];
    iconButton: React.ReactElement;
    onChange: (e: SelectChangeEvent<any>) => void;
}

const ActionsSectionDropdown =({ value, items, iconButton, onChange }: ActionsSectionDropdownProps) => {
    const theme = useTheme();

    return (
        <Grid container item xs={12} justifyContent='center' p={1} sx={{ color: theme.palette.secondary.main }}>
            <Grid xs={11}>
                <Select
                    fullWidth
                    value={value}
                    onChange={onChange}
                    displayEmpty
                    sx={{ height: theme.spacing(3) }}
                >
                    {items}
                </Select>
            </Grid>
            <Grid xs={1} pl={1}>{iconButton}</Grid>
        </Grid>
    );
}

export default ActionsSectionDropdown;