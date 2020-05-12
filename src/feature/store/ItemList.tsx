/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
import React from 'react';
import { makeStyles, Grid } from '@material-ui/core';
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
  root: {
    width: '45%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  main: {
    width: '100%',
  },
  item: {
    flexGrow: 1,
    flexShrink: 1,
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
        <Grid key={item._id} item className={classes.item}>
          <Item
            key={item._id}
            item={item}
            state="active"
            goToLoginPage={goToLoginPage}
          />
        </Grid>
      );
    }
    if (myItem?.map((mitem) => mitem.item_name).includes(item.item_name)) {
      return (
        <Grid key={item._id} item className={classes.item}>
          <Item
            key={item._id}
            item={item}
            state="purchased"
            goToLoginPage={goToLoginPage}
          />
        </Grid>
      );
    }
    return (
      <Grid key={item._id} item className={classes.item}>
        <Item
          key={item._id}
          item={item}
          state="purchasable"
          goToLoginPage={goToLoginPage}
        />
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
