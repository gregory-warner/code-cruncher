import {FormControl, Grid, IconButton, InputLabel, Select, SelectChangeEvent, useTheme} from "@mui/material";
import React from "react";

interface ActionsSectionDropdownProps {
    label: string;
    value: any;
    items: JSX.Element[];
    iconButton: React.ReactElement;
    onChange: (e: SelectChangeEvent<any>) => void;
    disabled: boolean;
}

const ActionsSectionDropdown =({ label, value, items, iconButton, onChange, disabled }: ActionsSectionDropdownProps) => {
    const theme = useTheme();

    return (
        <Grid container item xs={12} alignContent='center' justifyContent='center' p={1} sx={{ color: theme.palette.secondary.main }}>
            <Grid xs={11}>
                <FormControl fullWidth>
                    <InputLabel id='id-actions-section-dropdown-label'>{label}</InputLabel>
                    <Select
                        fullWidth
                        value={value}
                        onChange={onChange}
                        displayEmpty
                        disabled={disabled}
                    >
                        {items}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item alignContent='center' xs={1} pl={1}>
                <IconButton disabled={disabled}>{iconButton}</IconButton>
            </Grid>
        </Grid>
    );
}

export default ActionsSectionDropdown;