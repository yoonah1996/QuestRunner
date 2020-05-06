/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import ItemList from './ItemList';
import Category from './Category';
import { RootState } from '..';
import { serverHttp } from '../common/utils';
import { useSelector } from 'react-redux';

const myItem = {
  user: {
    active: {
      exp_bar: 'yellow',
      background: 'default',
      darkmode: false,
    },
  },
  items: {
    exp_bar: ['yellow', 'blue'],
    background: ['mountains', 'riverside'],
    darkmode: ['darkmode'],
  },
};

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'scroll',
  },
  hr: {
    width: '50%',
  },
}));

const Store = () => {
  const user = useSelector((state: RootState) => state.userLogin.user);
  const store = useSelector((state: RootState) => state.store);
  console.log(store);
  console.log(user);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    background: [],
    exp_bar: [],
    darkmode: [],
  });
  const getStoreItems = async () => {
    try {
      const storeItems = await axios.get(`${serverHttp}/items/storeItems`);
      const {
        data: { background, exp_bar, darkmode },
      } = storeItems;
      setData({
        background,
        exp_bar,
        darkmode,
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
            items={data.exp_bar}
            myActiveItem={myItem.user.active.exp_bar}
            myItem={myItem.items.exp_bar}
          />
          <hr className={classes.hr} />
          <Category name="darkmode" />
          <ItemList
            items={data.darkmode}
            myActiveItem={myItem.user.active.darkmode}
            myItem={myItem.items.darkmode}
          />
        </div>
      )}
    </>
  );
};

export default Store;
