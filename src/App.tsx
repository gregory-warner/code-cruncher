import React from 'react';
import './App.css';
import ChatApp from './features/chatApp/ChatApp';
import {darkTheme, lightTheme} from "./theme/theme";
import {useAppSelector} from "./app/hooks";
import {selectMode} from "./theme/themeSlice";
import {ThemeProvider} from "@mui/system";

function App() {
    const mode = useAppSelector(selectMode);
    const theme = mode === 'light' ? lightTheme : darkTheme;

    return (
        <ThemeProvider theme={theme}>
            <div className="App">
                <header className="App-header">
                        <ChatApp />
                </header>
            </div>
        </ThemeProvider>
    );
};

export default App;
