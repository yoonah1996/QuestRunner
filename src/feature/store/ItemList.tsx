/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
import Item from './Item';

interface IItem {
  _id: string;
  image: string;
  price: number;
  item_name: string;
  category: string;
}
interface IProp {
  items: Array<IItem>;
  myActiveItem: string | boolean;
  myItem: Array<string>;
}
const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
const ItemList: React.FC<IProp> = ({ items, myActiveItem, myItem }) => {
  const classes = useStyles();
  const itemList = items.map((item) => {
    if (item.item_name === myActiveItem) {
      return (
        <Grid key={item._id} item>
          <Item key={item._id} item={item} state="active" />
        </Grid>
      );
    }
    if (myItem.includes(item.item_name)) {
      return (
        <Grid key={item._id} item>
          <Item key={item._id} item={item} state="purchased" />
        </Grid>
      );
    }
    return (
      <Grid key={item._id} item>
        <Item key={item._id} item={item} state="purchasable" />
      </Grid>
    );
  });
  return (
    <Grid container className={classes.root} spacing={2}>
      <Grid item xs={12}>
        <Grid container justify="center" spacing={2}>
          {itemList}
        </Grid>
      </Grid>
    </Grid>
  );
};
export default ItemList;
