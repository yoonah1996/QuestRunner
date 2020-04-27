import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router,
} from 'react-router-dom';
import { RootState } from './store/modules';
import { setDarkmode } from './store/modules/userLogin';
import UserJoin from './components/UserJoin/UserJoin';
// 라우팅
// Islogin
const App: React.FC = () => {
  const isLogin = useSelector((state: RootState) => state.userSetter.isLogin);
  const dispatch = useDispatch();
  dispatch(setDarkmode(true));
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/userJoinPage" component={UserJoin} />
          {/* <Route
            path="/user"
            render={() => {
              if (!isLogin) {
                return <Redirect to="/userLoginPage" />;
              }
              return <Theplace />;
            }}
          /> */}
          <Route path="/" render={() => <Redirect to="/user" />} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
