import React from 'react';
import ChatApp from './features/chatApp/ChatApp';
import {darkTheme, lightTheme} from "./theme/theme";
import {useAppSelector} from "./store/hooks";
import {selectMode} from "./theme/themeSlice";
import {ThemeProvider} from "@mui/system"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ChatDashboard from "./features/dashboard/ChatDashboard";
import {CssBaseline} from "@mui/material";

function App() {
    const mode = useAppSelector(selectMode);
    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path='/' element={<ChatDashboard />} />
                    <Route path='/chat' element={<ChatApp />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
