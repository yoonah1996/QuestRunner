import React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from './store/modules';
// 라우팅
// Islogin


function App() {
  const isLogin = useSelector((state:RootState) => state.userSetter)
  console.log(isLogin);
  return (
    <div className="App">{isLogin.darkmode}
    </div>
  );
}

export default App;
