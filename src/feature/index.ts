/* eslint-disable no-param-reassign */
import { combineReducers } from '@reduxjs/toolkit';
import { userLoginSlice } from './usersignin/userloginService';
import { storeSlice } from './store/storeService';

const rootReducer = combineReducers({
  userLogin: userLoginSlice.reducer,
  store: storeSlice.reducer,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
