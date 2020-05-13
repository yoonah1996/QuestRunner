/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Item from './Item';
import { StoreItem } from '../common/interfaces';

// interface IItem {
//   _id: string;
//   image: string;
//   price: number;
//   item_name: string;
//   category: string;
// }
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
    // 내 active에 해당 item에 없고 아이템을 이미 구매한경우
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
    // 내 active에 해당 item에 없고 아이템을 구매하지 않은 경우
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
