import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import sessionReducer from '../features/session/sessionSlice';
import appReducer from '../app/store/appSlice';
import userReducer from '../features/user/userSlice';
import themeReducer from '../theme/themeSlice';
import {serverApi} from "../services/server/serverApi";
import {openaiApi} from "../services/openai/openaiApi";
import {ollamaApi} from "../services/ollama/ollamaApi";
import {setupListeners} from "@reduxjs/toolkit/query";
import actorConfigurationReducer from "../features/assistant/assistantSlice";

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    [openaiApi.reducerPath]: openaiApi.reducer,
    [ollamaApi.reducerPath]: ollamaApi.reducer,
    session: sessionReducer,
    theme: themeReducer,
    app: appReducer,
    user: userReducer,
    actorConfiguration: actorConfigurationReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serverApi.middleware, openaiApi.middleware, ollamaApi.middleware),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
