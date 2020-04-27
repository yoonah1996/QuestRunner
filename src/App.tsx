import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { RootState } from './store/modules';
import { setDarkmode } from './store/modules/userLogin';
// 라우팅
// Islogin
const App: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.userSetter.isLogin);
  const dispatch = useDispatch();
  dispatch(setDarkmode(true));
  return (
    <div className="App">
      <Switch>
        <Route
          exact
          path="/userLoginPage"
          render={() => <UserLogin/>}
        />
        <Route
          exact
          path="/userJoinPage"
          render={() => <UserJoin/>}
        />
        <Route
          path="/user"
          render={() => {
            if (!isLogin) {
              return <Redirect to="/userLoginPage" />;
            }
            return <Theplace />;
          }}
        />
        <Route path="/" render={() => <Redirect to="/user" />} />
      </Switch>
    </div>
  );
};

export default App;
