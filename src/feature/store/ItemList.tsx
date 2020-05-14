/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Item from './Item';
import { StoreItem } from '../common/interfaces';

interface IProp {
  items: Array<StoreItem> | undefined;
  myActiveItem: StoreItem | undefined;
  myItem: StoreItem[] | undefined;
  goToLoginPage: Function;
}
const useStyles = makeStyles(() => ({
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 100px)',
    gridGap: '10px',
  },
}));

const ItemList: React.FC<IProp> = ({
  items,
  myActiveItem,
  myItem,
  goToLoginPage,
}) => {
  const classes = useStyles();
  const itemList = items?.map((item) => {
    if (item.item_name === myActiveItem?.item_name) {
      return (
        <Item
          key={item._id}
          item={item}
          state="active"
          goToLoginPage={goToLoginPage}
        />
      );
    }
    if (myItem?.map((mitem) => mitem.item_name).includes(item.item_name)) {
      return (
        <Item
          key={item._id}
          item={item}
          state="purchased"
          goToLoginPage={goToLoginPage}
        />
      );
    }
    if (
      !myActiveItem?.item_name &&
      myItem?.map((mitem) => mitem.item_name).includes(item.item_name)
    ) {
      return (
        <Item
          key={item._id}
          item={item}
          state="purchased"
          goToLoginPage={goToLoginPage}
        />
      );
    }
    if (
      !myActiveItem?.item_name &&
      !myItem?.map((mitem) => mitem.item_name).includes(item.item_name)
    ) {
      return (
        <Item
          key={item._id}
          item={item}
          state="purchasable"
          goToLoginPage={goToLoginPage}
        />
      );
    }
    return (
      <Item
        key={item._id}
        item={item}
        state="purchasable"
        goToLoginPage={goToLoginPage}
      />
    );
  });
  return <div className={classes.grid}>{itemList}</div>;
};
export default ItemList;
