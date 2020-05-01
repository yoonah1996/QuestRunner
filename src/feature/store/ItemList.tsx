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
}

interface IProp {
  items: Array<IItem>;
  category: string;
}

const useStyles = makeStyles((theme) => ({
  main: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const ItemList: React.FC<IProp> = ({ items, category }) => {
  const classes = useStyles();
  // grid를 쓰자.
  const itemList = items.map((item) => (
    // eslint-disable-next-line no-underscore-dangle
    <Item key={item._id} item={item} category={category} />
  ));
  return <div className={classes.main}>{itemList}</div>;
};
export default ItemList;
