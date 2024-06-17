import React from 'react';
import ChatApp from './features/chatApp/ChatApp';
import {darkTheme, lightTheme} from "./theme/theme";
import {useAppDispatch, useAppSelector} from "./store/hooks";
import {selectMode} from "./theme/themeSlice";
import {ThemeProvider} from "@mui/system"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatDashboard from "./features/dashboard/ChatDashboard";
import {CssBaseline, Snackbar} from "@mui/material";
import {selectSnackbar, setSnackbar} from "./store/appSlice";

function App() {
    const mode = useAppSelector(selectMode);
    const theme = mode === 'light' ? lightTheme : darkTheme;

    const dispatch = useAppDispatch();
    const snackbar = useAppSelector(selectSnackbar);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path='/' element={<ChatDashboard />} />
                    <Route path='/chat' element={<ChatApp />} />
                </Routes>
            </Router>
            <Snackbar open={snackbar.isOpen} message={snackbar.message} autoHideDuration={4000} onClose={() => dispatch(setSnackbar({message: '', isOpen: false}))} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} />
        </ThemeProvider>
    );
}

export default App;
