/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ItemList from './ItemList';
import Category from './Category';
import { RootState } from '..';
import { serverHttp } from '../common/utils';
import { StoreItem } from '../common/interfaces';

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
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
  const user = useSelector((state: RootState) => state.userLogin.user);
  const store = useSelector((state: RootState) => state.store);
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    background: [] as StoreItem[] | undefined,
    exp_bar: [] as StoreItem[] | undefined,
    darkmode: [] as StoreItem[] | undefined,
  });
  const getStoreItems = async () => {
    try {
      const { background, exp_bar, darkmode } = store;
      if (background.length > 0 && darkmode.length > 0 && exp_bar.length > 0) {
        setData({
          background,
          exp_bar,
          darkmode,
        });
      } else {
        const storeItems = await axios.get(`${serverHttp}/items/storeItems`);
        const {
          data: { background, exp_bar, darkmode },
        } = storeItems;
        setData({
          background,
          exp_bar,
          darkmode,
        });
      }
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
            myActiveItem={user?.active.background}
            myItem={user?.items.background}
          />
          <hr className={classes.hr} />
          <Category name="experienceBar" />
          <ItemList
            items={data.exp_bar}
            myActiveItem={user?.active.exp_bar}
            myItem={user?.items.exp_bar}
          />
          <hr className={classes.hr} />
          <Category name="darkmode" />
          <ItemList
            items={data.darkmode}
            myActiveItem={user?.active.darkmode}
            myItem={user?.items.darkmode}
          />
        </div>
      )}
    </>
  );
};

export default Store;
