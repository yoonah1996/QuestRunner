/* eslint-disable react/prop-types */
/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable space-in-parens */
import React from 'react';
import DateRangePicker from 'react-daterange-picker';
import 'react-daterange-picker/dist/css/react-calendar.css';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { RootState } from '..';

interface IProps {
  changeRange: Function;
}
const useStyles = makeStyles((theme) => ({
  date: (darkmode: any) => ({
    backgroundColor: darkmode.dark
      ? 'rgba(136,136,136,0.7)'
      : 'rgba(255,255,255,0.9)',
    color: darkmode.dark ? '#e0e0e0' : 'black',
    marginRight: '10px',
    borderRadius: '5px',
    boxShadow: theme.shadows[5],
  }),
}));

interface Range {
  start: string;
  end: string;
}

const DateRange: React.FC<IProps> = ({ changeRange }) => {
  const dark = useSelector(
    (state: RootState) => state.userLogin.user?.darkmode,
  );
  const darkmode = {
    dark,
  };
  const classes = useStyles(darkmode);

  const onSelect = (range: any) => {
    changeRange({
      start: range.start.format('YYYYMMDD'),
      end: range.end.format('YYYYMMDD'),
    });
  };
  return (
    <DateRangePicker
      onSelect={onSelect}
      singleDateRange
      className={classes.date}
    />
  );
};

export default DateRange;
