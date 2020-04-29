/* eslint-disable no-param-reassign */
import { combineReducers } from '@reduxjs/toolkit';
import { userLoginSlice } from './usersignin/userloginService';

const rootReducer = combineReducers({
  userLogin: userLoginSlice.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
