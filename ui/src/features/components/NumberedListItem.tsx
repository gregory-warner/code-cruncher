import React from "react";
import {Grid, ListItem, Typography, useTheme} from "@mui/material";
import { listItemStyle as style } from "./style";

interface NumberedListItemProps {
    name: string;
    itemNumber: number;
    onClick: () => void;
}

const NumberedListItem = ({ name, itemNumber, onClick }: NumberedListItemProps) => {
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
                        <Typography
                            whiteSpace='nowrap'
                            overflow='hidden'
                            textOverflow='ellipsis'
                            paddingLeft='3px'
                            align='left'
                            variant='body1'
                        >
                            {name}
                        </Typography>
                    }
                </Grid>
            </Grid>
        </ListItem>
    );
};

export default NumberedListItem;