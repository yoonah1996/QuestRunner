import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from './feature';
import { userLoginActions } from './feature/usersignin/userloginService';
import UserLogin from './feature/usersignin/UserLogin';
import UserJoin from './feature/userjoin/UserJoin';

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
      {/* <Route
            path="/user"
            render={() => {
              if (!isLogin) {
                return <Redirect to="/userLoginPage" />;
              }
              return <Theplace />;
            }}
          /> */}
      <Route path="/" render={() => <Redirect to="/userLoginPage" />} />
    </Switch>
  );
};

export default App;
