/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core';

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
const EnhancedTableHead: React.FC<IProp> = (props) => {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
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
