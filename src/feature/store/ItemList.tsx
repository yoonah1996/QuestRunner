/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Item from './Item';

interface IItem {
  feature: string;
  id: number;
  image: string;
  price: number;
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
    <Item key={item.id} item={item} category={category} />
  ));
  return <div className={classes.main}>{itemList}</div>;
};
export default ItemList;
