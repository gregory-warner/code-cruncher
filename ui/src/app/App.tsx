import React from 'react';
import CodeCruncherApp from '../features/codeCruncher/CodeCruncherApp';
import {darkTheme, lightTheme} from "../theme/theme";
import {useAppSelector} from "../store/hooks";
import {selectMode} from "../theme/themeSlice";
import {ThemeProvider} from "@mui/system"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {CssBaseline} from "@mui/material";
import CodeCruncherSnackbar from "./components/CodeCruncherSnackbar";

function App() {
    const mode = useAppSelector(selectMode);
    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Routes>
                    <Route path='/' element={<CodeCruncherApp />} />
                </Routes>
            </Router>
            <CodeCruncherSnackbar />
        </ThemeProvider>
    );
}

export default App;
