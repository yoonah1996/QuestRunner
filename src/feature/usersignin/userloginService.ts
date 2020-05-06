/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
  createAction, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { User } from '../common/interfaces';

type UserState = {
  user:User | null;
  isLogin:boolean;
  accessToken:string | null;
  refreshToken:string | null;
};

const initialState: UserState = {
  user: null,
  isLogin: false,
  accessToken: null,
  refreshToken: null,
};

const actionPrefix = 'LOGIN';

const setLogin = createAction<object>(`${actionPrefix}/login`);
const setUser = createAction<object>(`${actionPrefix}/user`);

const reducers = {
  login: (state : UserState, { payload: { isLogin, accessToken, refreshToken } } : PayloadAction<UserState>) => {
    state.isLogin = isLogin;
    state.accessToken = accessToken;
    state.refreshToken = refreshToken;
  },
  user: (state : UserState, { payload: { user } }:PayloadAction<UserState>) => {
    state.user = user;
  },
};

export const userLoginSlice = createSlice({
  reducers,
  initialState,
  name: actionPrefix,
});

export const userLoginActions = {
  setLogin,
  setUser,
};
