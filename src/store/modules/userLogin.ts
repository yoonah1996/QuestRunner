import { User } from './interfaces';
// types

const SET_LOGIN = 'SET_LOGIN' as const;
const SET_DARK_MODE = 'SET_DARK_MODE' as const;
const SET_USER = 'SET_USER' as const;

// action
export const setLogin = (isLogin: boolean, token: string) => ({
  type: SET_LOGIN,
  payload: {
    isLogin,
    token,
  },
});

export const setDarkmode = (darkmode: boolean) => ({
  type: SET_DARK_MODE,
  payload: darkmode,
});

export const setUser = (user: User) => ({
  type: SET_USER,
  payload: user,
});


type UserAction =
  | ReturnType<typeof setLogin>
  | ReturnType<typeof setDarkmode>
  | ReturnType<typeof setUser>;

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

function userSetter(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case SET_LOGIN:
      return { ...state, isLogin: action.payload.isLogin, token: action.payload.token };
    case SET_DARK_MODE:
      return { ...state, darkmode: action.payload };
    case SET_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
}

export default userSetter;
