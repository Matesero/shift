import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { authReducer } from './auth/auth-slice';
import { useDispatch } from 'react-redux';
import { createWrapper } from "next-redux-wrapper";

export const rootReducer = combineReducers({
    auth: authReducer,
});

export const makeStore = () => configureStore({
    reducer: rootReducer,
});

export const wrapper = createWrapper(makeStore);

export type RootState = ReturnType<ReturnType<typeof makeStore>['getState']>;
export type AppDispatch = ReturnType<typeof makeStore>['dispatch'];
export const useAppDispatch = () => useDispatch<AppDispatch>();
