/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */
import {
  createAction, createSlice, PayloadAction,
} from '@reduxjs/toolkit';

type navState = {
    navComponent: string;
}

const initialState : navState = {
  navComponent: 'QUEST',
};

const actionPrefix = 'NAV';

const setComponent = createAction<object>(`${actionPrefix}/component`);

const reducers = {
  component: (state : navState, { payload: { navComponent } } : PayloadAction<navState>) => {
    state.navComponent = navComponent;
  },
};

export const navSlice = createSlice({
  reducers,
  initialState,
  name: actionPrefix,
});

export const navActions = {
  setComponent,
};
