import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import ItemList from './ItemList';
import Category from './Category';
// import { RootState } from '..';
import { serverHttp } from '../common/utils';
// import { useSelector } from 'react-redux';

const myItem = {
  user: {
    active: {
      experiencebar: 'yellow',
      background: 'default',
      darkmode: false,
    },
  },
  items: {
    experiencebar: ['yellow', 'blue'],
    background: ['mountains'],
    // darkmode: [],
  },
};

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  hr: {
    width: '50%',
  },
}));

const Store = () => {
  // const user = useSelector((state: RootState) => state.userLogin.user);
  // console.log(user);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    background: [],
    experienceBar: [],
    // darkmode: [],
  });
  const getStoreItems = async () => {
    try {
      const storeItems = await axios.get(`${serverHttp}/items/storeItems`);
      // 다크모드도 와야함
      const {
        data: { background, experienceBar },
      } = storeItems;
      setData({
        background,
        experienceBar,
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getStoreItems();
  }, []);
  return (
    <>
      {loading ? (
        <div className={classes.main}>Loading...</div>
      ) : (
        <div className={classes.main}>
          <Category name="background" />
          <ItemList
            items={data.background}
            myActiveItem={myItem.user.active.background}
            myItem={myItem.items.background}
          />
          <hr className={classes.hr} />
          <Category name="experienceBar" />
          <ItemList
            items={data.experienceBar}
            myActiveItem={myItem.user.active.experiencebar}
            myItem={myItem.items.experiencebar}
          />
          <hr className={classes.hr} />
          {/* <Category name="darkmode" /> */}
          {/* <ItemList
            items={data.darkmode}
            myActiveItem={myItem.user.active.darkmode}
            myItem={myItem.items.darkmode}
          /> */}
        </div>
      )}
    </>
  );
};

export default Store;
