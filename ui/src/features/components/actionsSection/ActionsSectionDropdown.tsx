import {FormControl, Grid, InputLabel, Select, SelectChangeEvent, useTheme} from "@mui/material";
import React from "react";

interface ActionsSectionDropdownProps {
    label: string;
    value: any;
    items: JSX.Element[];
    iconButton: React.ReactElement;
    onChange: (e: SelectChangeEvent<any>) => void;
}

const ActionsSectionDropdown =({ label, value, items, iconButton, onChange }: ActionsSectionDropdownProps) => {
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
                    >
                        {items}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item alignContent='center' xs={1} pl={1}>{iconButton}</Grid>
        </Grid>
    );
}

export default ActionsSectionDropdown;