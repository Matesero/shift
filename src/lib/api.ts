import axios from "axios";
import Cookies from 'js-cookie';
import { createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "@/types";

const api = axios.create({
    baseURL: 'https://shift-backend.onrender.com/',
});

export const createOtp = createAsyncThunk<
    { success: boolean; reasons: string; retryDelay: number },
    { phone: string; }
>(
    'auth/otp',
    async ({ phone }, { rejectWithValue }) => {
        try {
            console.log(phone)
            const response = await api.post(`/auth/otp`, {
                phone
            }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const signin = createAsyncThunk<
    { success: boolean; reasons: string; retryDelay: number },
    { phone: string; code: number }
>(
    'users/signin',
    async ({ phone, code }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/users/signin`, {
                phone, code
            }, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
            });

            let token = response.data.token;
            Cookies.set('jwt', token, { expires: 1 });

            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const requestSession = createAsyncThunk<
    { success: boolean; reasons: string; user: User },
    { token: string }
>(
    'users/session',
    async ({ token }, { rejectWithValue }) => {
        try {
            const response = await api.get(`/users/session`, {
                headers: {
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            return response.data;
        } catch (error) {
            return rejectWithValue((error as Error).message);
        }
    }
);

export const logout = async () => {
    Cookies.remove('jwt');
    location.reload();
};