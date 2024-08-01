import {createTheme} from '@mui/material/styles';

export const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        background: {
            default: '#2E2E2E',
            paper: '#383838',
        },
        text: {
            primary: '#E0E0E0',
            secondary: '#A8A8A8',
        },
        primary: {
            main: '#00FF00',
        },
        secondary: {
            main: '#FFA500',
        }
    }
});

export const lightTheme = createTheme({
    palette: {
        mode: 'light',
        background: {
            default: '#FFFFFF',
            paper: '#F0F0F0',
        },
        text: {
            primary: '#000000',
            secondary: '#333333',
        },
        primary: {
            main: '#0000FF',
        }
    }
});