import {combineReducers} from 'redux';
import userSetter from './userLogin';

const rootReducer = combineReducers({
  userSetter
})

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;