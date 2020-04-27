/* eslint-disable no-param-reassign */
import { combineReducers } from '@reduxjs/toolkit';
import { commonSlice } from './userLogin';

const rootReducer = combineReducers({
  commons: commonSlice.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
