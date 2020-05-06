/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
  createAction, createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { Store } from '../common/interfaces';


const initialState: Store = {
  background: [],
  exp_bar: [],
  darkmode: [],
};

const actionPrefix = 'STORE';

const setStore = createAction<object>(`${actionPrefix}/loadStore`);

const reducers = {
  loadStore: (state : Store, { payload: { background, exp_bar, darkmode } } : PayloadAction<Store>) => {
    state.background = background;
    state.exp_bar = exp_bar;
    state.darkmode = darkmode;
  },
};

export const storeSlice = createSlice({
  reducers,
  initialState,
  name: actionPrefix,
});

export const storeActions = {
  setStore,
};
