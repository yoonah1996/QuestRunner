import React from 'react';
import { makeStyles } from '@material-ui/core';
import ItemList from './ItemList';
import Category from './Category';

const dummyData = {
  background: [
    {
      feature: 'default',
      id: 123123,
      image:
        'https://images.unsplash.com/photo-1558981033-0f0309284409?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      price: 1000,
    },
    {
      feature: 'black',
      id: 123124,
      image:
        'https://images.unsplash.com/photo-1588193024765-398ae53deb18?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      price: 1000,
    },
    {
      feature: 'mountain',
      id: 123125,
      image:
        'https://images.unsplash.com/photo-1588282809595-e457e113b4b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      price: 1000,
    },
  ],
  experienceBar: [
    {
      feature: 'black',
      id: 223524,
      image:
        'https://images.unsplash.com/photo-1588208072861-0f5508e16689?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      price: 2000,
    },
    {
      feature: 'orange',
      id: 223525,
      image:
        'https://images.unsplash.com/photo-1588250003650-4dbcb25eaba8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      price: 2000,
    },
    {
      feature: 'yellow',
      id: 223526,
      image:
        'https://images.unsplash.com/photo-1588254949452-4a87bd0a9353?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      price: 2000,
    },
  ],
  darkmode: [
    {
      feature: 'darkmode',
      id: 0o0,
      image:
        'https://images.unsplash.com/photo-1588279901205-290e221aa9b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
      price: 0,
    },
  ],
};

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
  // api가 완료되면 useEffect를 사용하여 불러올것!
  return (
    <div className={classes.main}>
      <Category name="background" />
      <ItemList items={dummyData.background} category="background" />
      <hr className={classes.hr} />
      <Category name="experienceBar" />
      <ItemList items={dummyData.experienceBar} category="experienceBar" />
      <hr className={classes.hr} />
      <Category name="darkmode" />
      <ItemList items={dummyData.darkmode} category="darkmode" />
    </div>
  );
};

export default Store;
