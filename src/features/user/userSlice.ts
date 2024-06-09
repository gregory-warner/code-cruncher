import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { getActiveUser } from '../../api/server';
import { addUserMessenger } from '../messageCard/store/messageCardSlice';
import {updateDialog, UpdateDialogResponse} from "../conversation/store/conversationSlice";

export const defaultUser = "eagle-bonnet";

interface UserState {
    user: User|null,
    users: Record<number, User>,
}

const initialState: UserState = {
    user: null,
    users: {},
};

export const UserSlice = createSlice({
    name: "user",
    initialState, 
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload ?? initialState.user;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(updateDialog.fulfilled, (state: UserState, action: PayloadAction<UpdateDialogResponse>) => {
            state.user = action.payload.user;
        });
    }
});

export const { setUser } = UserSlice.actions;

export const selectUser = (state: RootState): User => {
    return state.user.user;
};

export const updateUser = createAsyncThunk<void, string>("user/updateUser", async (username: string, { dispatch }) => {
    const response = await getActiveUser(username);
    const user = response.data;
    dispatch(setUser(user));
    dispatch(addUserMessenger(user));
});

export const isUser = (user: User | null): user is User => {
    return user && typeof user !== 'undefined';
};

export default UserSlice.reducer;