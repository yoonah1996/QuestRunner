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
  loadStore: (state : Store, payload : PayloadAction<Store>) => {
    state = payload.payload;
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
