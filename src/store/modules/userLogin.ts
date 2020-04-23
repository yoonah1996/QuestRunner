// types

const SET_LOGIN = 'SET_LOGIN' as const;
const SET_DARK_MODE = 'SET_DARK_MODE' as const;
const SET_USER_INFO = 'SET_USER_INFO' as const;

export interface UserInfo{
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  darkmode: boolean;
  avatar: string;
}

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

export const setUserInfo = (userInfo: UserInfo) => ({
  type: SET_USER_INFO,
  payload: userInfo,
});


type UserAction =
  | ReturnType<typeof setLogin>
  | ReturnType<typeof setDarkmode>
  | ReturnType<typeof setUserInfo>;

type UserState = {
  userInfo:UserInfo | null;
  isLogin:boolean;
  token:string | null;
  darkmode:boolean;
};


const initialState: UserState = {
  userInfo: null,
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
    case SET_USER_INFO:
      return { ...state, userInfo: action.payload };
    default:
      return state;
  }
}

export default userSetter;
