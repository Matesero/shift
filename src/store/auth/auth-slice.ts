import { createSlice } from '@reduxjs/toolkit';
import { User } from '@/types';
import { createOtp, signin } from "@/lib/api";
import { RootState } from "@/store/store";

type InitialState = {
    success: boolean | null;
    reason: string;
    user: User | null;
    retryDelay: number | null;
    error: string;
}

const initialState: InitialState = {
    success: null,
    reason: '',
    user: null,
    retryDelay: null,
    error: '',
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action) {
            state.user = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createOtp.pending, (state) => {
                state.error = '';
            })
            .addCase(createOtp.fulfilled, (state, action) => {
                state.success = true;
                state.reason = action.payload.reason;
                state.retryDelay = action.payload.retryDelay;
            })
            .addCase(createOtp.rejected, (state, action) => {
                state.error = action.error.message as string;
            })
            .addCase(signin.pending, (state) => {
                state.error = '';
            })
            .addCase(signin.fulfilled, (state, action) => {
                state.success = true;
                state.reason = action.payload.reason;
                state.user = action.payload.user;
            })
            .addCase(signin.rejected, (state, action) => {
                state.error = action.error.message as string;
            })
    },
});

export const selectUser = (state: RootState) => state.auth.user;
export const { setUser } = authSlice.actions;
export const authReducer = authSlice.reducer;