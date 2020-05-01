import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import ItemList from './ItemList';
import Category from './Category';
import { serverHttp } from '../common/utils';

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    border: '1px solid black',
  },
  hr: {
    width: '50%',
  },
}));

const Store = () => {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    background: [],
    experienceBar: [],
  });
  // api가 완료되면 useEffect를 사용하여 불러올것!
  const getStoreItems = async () => {
    try {
      const storeItems = await axios.get(`${serverHttp}/items/storeItems`);
      const {
        data: { background, experienceBar },
      } = storeItems;
      setData({
        background,
        experienceBar,
      });
    } catch {
      console.log('error');
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
        <div>Loading...</div>
      ) : (
        <div className={classes.main}>
          <Category name="background" />
          <ItemList items={data.background} category="background" />
          <hr className={classes.hr} />
          <Category name="experienceBar" />
          <ItemList items={data.experienceBar} category="experienceBar" />
          <hr className={classes.hr} />
          {/* <Category name="darkmode" />
      <ItemList items={dummyData.darkmode} category="darkmode" /> */}
        </div>
      )}
    </>
  );
};

export default Store;
