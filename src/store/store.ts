import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import actorDrawerReducer from '../features/actorDrawer/ActorDrawerSlice';
import actorReducer from '../features/actor/actorSlice';
import conversationReducer from '../features/conversation/store/conversationSlice';
import userReducer from '../features/user/userSlice';
import messageCardReducer from '../features/messageCard/store/messageCardSlice';
import actorConfigDrawerReducer from '../features/actorConfigDrawer/store/actorConfigDrawerSlice';
import chatDashboardReducer from '../features/dashboard/chatDashboardSlice';
import actorCreationDrawerReducer from '../features/actorCreationDrawer/store/actorCreationDrawerSlice';
import themeReducer from '../theme/themeSlice';
import { serverApi } from "../services/server/serverApi";
import { openaiApi } from "../services/openai/openaiApi";
import {setupListeners} from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [serverApi.reducerPath]: serverApi.reducer,
    [openaiApi.reducerPath]: openaiApi.reducer,
    actorDrawer: actorDrawerReducer,
    actor: actorReducer,
    conversation: conversationReducer,
    user: userReducer,
    messageCard: messageCardReducer,
    actorConfigDrawer: actorConfigDrawerReducer,
    theme: themeReducer,
    chatDashboard: chatDashboardReducer,
    actorCreationDrawer: actorCreationDrawerReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(serverApi.middleware, openaiApi.middleware),
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
