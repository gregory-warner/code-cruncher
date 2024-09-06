import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import sessionReducer from '../features/session/store/sessionSlice';
import chatDashboardReducer from '../features/dashboard/chatDashboardSlice';
import actorCreationDrawerReducer from '../features/actorDrawer/store/actorDrawerSlice';
import appReducer from '../app/store/appSlice';
import userReducer from '../features/user/userSlice';
import themeReducer from '../theme/themeSlice';
import {serverApi} from "../services/server/serverApi";
import {openaiApi} from "../services/openai/openaiApi";
import {ollamaApi} from "../services/ollama/ollamaApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    [openaiApi.reducerPath]: openaiApi.reducer,
    [ollamaApi.reducerPath]: ollamaApi.reducer,
    session: sessionReducer,
    theme: themeReducer,
    chatDashboard: chatDashboardReducer,
    actorCreationDrawer: actorCreationDrawerReducer,
    app: appReducer,
    user: userReducer,
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
