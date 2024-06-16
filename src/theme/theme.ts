import { createTheme } from '@mui/material/styles';


const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
        background: {
            default: '#e3e3e3', // Soft gray background color
        },
        text: {
            primary: '#000000', // Default text color
        },
    },
});


const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
    },
});


export { lightTheme, darkTheme };