import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
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

export default UserSlice.reducer;