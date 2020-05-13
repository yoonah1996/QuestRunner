/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
import React, { useEffect, useState } from 'react';
import { makeStyles, Fade } from '@material-ui/core';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import ItemList from './ItemList';
import Category from './Category';
import { RootState } from '..';
import { serverHttp } from '../common/utils';
import { StoreItem } from '../common/interfaces';

const useStyles = makeStyles(() => ({
  main: {
    width: '100%',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'scroll',
  },
  hr: {
    width: '50%',
  },
}));

const Store: React.FC<RouteComponentProps> = ({ history: { push } }) => {
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
  const goToLoginPage = () => push('/login');
  useEffect(() => {
    getStoreItems();
  }, []);
  return (
    <>
      {loading ? (
        <div className={classes.main}>Loading...</div>
      ) : (
        <Fade in>
          <div className={classes.main}>
            <Category name="background" />
            <ItemList
              items={data.background}
              myActiveItem={user?.active?.background}
              myItem={user?.items.background}
              goToLoginPage={goToLoginPage}
            />
            <hr className={classes.hr} />
            <Category name="experience bar" />
            <ItemList
              items={data.exp_bar}
              myActiveItem={user?.active?.exp_bar}
              myItem={user?.items.exp_bar}
              goToLoginPage={goToLoginPage}
            />
            <hr className={classes.hr} />
            <Category name="dark mode" />
            <ItemList
              items={data.darkmode}
              myActiveItem={user?.active?.darkmode}
              myItem={user?.items.darkmode}
              goToLoginPage={goToLoginPage}
            />
          </div>
        </Fade>
      )}
    </>
  );
};

export default Store;
