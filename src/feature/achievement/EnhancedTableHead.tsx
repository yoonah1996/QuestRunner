/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
  makeStyles,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '..';

const headCells = [
  {
    id: 'title',
    label: 'Title',
    minWidth: 125,
    numeric: false,
  },
  {
    id: 'contents',
    label: 'Contents',
    minWidth: 125,
    numeric: false,
  },
  {
    id: 'due_date',
    label: 'Due Date',
    minWidth: 125,
    numeric: true,
  },
  {
    id: 'completed',
    label: 'Completed',
    minWidth: 125,
    numeric: false,
  },
];
interface IProp {
  order: any;
  orderBy: any;
  onRequestSort: Function;
}
const useStyles = makeStyles((theme) => ({
  tableHead: (darkmode: any) => ({
    backgroundColor: darkmode.dark ? '#888888' : theme.palette.background.paper,
    color: darkmode.dark ? '#e0e0e0' : 'black',
  }),
}));

const EnhancedTableHead: React.FC<IProp> = (props) => {
  const dark = useSelector(
    (state: RootState) => state.userLogin.user?.darkmode,
  );
  const darkmode = {
    dark,
  };
  const classes = useStyles(darkmode);
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            className={classes.tableHead}
            key={headCell.id}
            align="center"
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export default EnhancedTableHead;
