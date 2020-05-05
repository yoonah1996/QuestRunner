/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Item from './Item';

interface IItem {
  feature: string;
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
      return <Item key={item._id} item={item} state="active" />;
    }
    if (myItem.includes(item.item_name)) {
      return <Item key={item._id} item={item} state="purchased" />;
    }
    return <Item key={item._id} item={item} state="purchasable" />;
  });
  return <div className={classes.main}>{itemList}</div>;
};
export default ItemList;
