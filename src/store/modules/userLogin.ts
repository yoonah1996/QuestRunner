/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
  createAction, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { User } from './interfaces';

type UserState = {
  user:User | null;
  isLogin:boolean;
  token:string | null;
  darkmode : boolean;
};

const initialState: UserState = {
  user: null,
  isLogin: false,
  token: null,
  darkmode: false,
};

const actionPrefix = 'COMMON';

const setLogin = createAction<object>(`${actionPrefix}/login`);
const setDarkmode = createAction<object>(`${actionPrefix}/darkmode`);
const setUser = createAction<object>(`${actionPrefix}user`);

const reducers = {
  login: (state : UserState, { payload: { isLogin, token } } : PayloadAction<UserState>) => {
    state.isLogin = isLogin;
    state.token = token;
  },
  darkmode: (state : UserState, { payload: { darkmode } }:PayloadAction<UserState>) => {
    state.darkmode = darkmode;
  },
  user: (state : UserState, { payload: { user } }:PayloadAction<UserState>) => {
    state.user = user;
  },
};

export const commonSlice = createSlice({
  reducers,
  initialState,
  name: actionPrefix,
});

export const actions = {
  setLogin,
  setDarkmode,
  setUser,
};
