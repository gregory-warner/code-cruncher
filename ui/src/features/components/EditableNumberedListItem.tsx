import React from "react";
import {Grid, ListItem, TextField, Typography, useTheme} from "@mui/material";
import { listItemStyle as style } from "./style";

interface EditableNumberedListProps {
    onClick: () => void;
    itemNumber: number;
    sessionName: string;
    onEdit: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyUp?: () => void;
}

const NumberedListItem = ({ onClick, itemNumber, sessionName, onEdit, onKeyUp=() => {} }: EditableNumberedListProps) => {
    const theme = useTheme();

    return (
        <ListItem
            sx={style.listItem(theme)}
            onClick={onClick}
        >
            <Grid container alignItems='center' sx={style.contentContainer}>
                <Grid item xs={1} sx={style.numberContainer}>
                    <Typography variant='body1'>{`${itemNumber}. `}</Typography>
                </Grid>
                <Grid item xs={7} sx={style.labelContainer}>
                    {
                        <TextField
                            value={sessionName}
                            onChange={onEdit}
                            onKeyUp={onKeyUp}
                            size="small"
                        />
                    }
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default NumberedListItem;