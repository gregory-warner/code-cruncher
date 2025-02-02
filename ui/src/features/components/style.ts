import {SxProps, Theme} from "@mui/material";

interface ListItemStyle {
    listItem: (theme: Theme) => SxProps<Theme>;
    contentContainer: SxProps<Theme>;
    numberContainer: SxProps<Theme>;
    labelContainer: SxProps<Theme>;
}

export const listItemStyle: ListItemStyle = {
    listItem: (theme: Theme) => ({
        width: '95%',
        textTransform: 'none',
        color: 'inherit',
        '&:hover': { cursor: 'pointer' },
        '&:hover:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            outlineOffset: '-1px',
            transition: 'border-color .3s, box-shadow .3s',
            boxShadow: `0 0 10px ${theme.palette.primary.main}`,
        },
    }),
    contentContainer: {
        flexGrow: 1,
    },
    numberContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    labelContainer: {
        paddingLeft: '3px',
    },
};