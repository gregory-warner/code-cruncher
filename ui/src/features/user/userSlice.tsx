import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {User} from '../../types';
import {RootState} from '../../store/store';

export const defaultUser = 'eagle-bonnet';
export const defaultUserId = 1;

export interface UserState {
    user: User|null
}

const initialState: UserState = {
    user: null,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
        },
    },
});

export const {
    setUser,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user.user;

export default userSlice.reducer;