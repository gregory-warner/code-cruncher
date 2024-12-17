import React from 'react';
import {darkTheme, lightTheme} from "../theme/theme";
import {useAppSelector} from "../store/hooks";
import {selectMode} from "../theme/themeSlice";
import {ThemeProvider} from "@mui/system"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {CssBaseline} from "@mui/material";
import AppSnackbar from "./components/AppSnackbar";
import ActorConfiguration from "../features/actorConfiguration/ActorConfiguration";
import Session from "../features/session/Session";
import "./app.css";

function App() {
    const mode = useAppSelector(selectMode);
    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path='/' element={<Session />} />
                    <Route path='/configuration' element={<ActorConfiguration />} />
                </Routes>
            </Router>
            <AppSnackbar />
        </ThemeProvider>
    );
}

export default App;
