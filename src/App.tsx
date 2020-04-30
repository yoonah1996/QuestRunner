import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from './feature';
import { userLoginActions } from './feature/usersignin/userloginService';
import UserLogin from './feature/usersignin/UserLogin';
import UserJoin from './feature/userjoin/UserJoin';
import MainPage from './feature/mainpage/MainPage';
import Store from './feature/store/Store';

// 라우팅
// Islogin
const App: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.userLogin.isLogin);
  // const dispatch = useDispatch();
  // dispatch(actions.setDarkmode({ darkmode: true }));
  return (
    <Switch>
      <Route exact path="/userJoinPage" component={UserJoin} />
      <Route exact path="/userLoginPage" component={UserLogin} />
      <Route exact path="/mainPage" component={MainPage} />
      <Route exact path="/store" component={Store} />
      {/* <Route
            path="/user"
            render={() => {
              if (!isLogin) {
                return <Redirect to="/userLoginPage" />;
              }
              return <Theplace />;
            }}
          /> */}
      {/* <Route path="/" render={() => <Redirect to="/userLoginPage" />} /> */}
      <Route path="/" render={() => <Redirect to="/store" />} />
    </Switch>
  );
};

export default App;
