/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { RootState } from '..';

interface IProps {
  quests: any;
  onFilteredQuests: Function;
}
const useStyles = makeStyles((theme) => ({
  info: (darkmode: any) => ({
    margin: '15px 0',
    fontSize: '15px',
    boxShadow: theme.shadows[5],
    backgroundColor: darkmode.dark ? '#888888' : theme.palette.background.paper,
    color: darkmode.dark ? 'e0e0e0' : 'black',
    padding: '0 15px',
    borderRadius: '5px',
  }),
  total: (darkmode: any) => ({
    border: 'none',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: darkmode.dark ? '#888888' : theme.palette.background.paper,
    color: darkmode.dark ? '#e0e0e0' : 'black',
    cursor: 'pointer',
  }),
  btnSuccess: (darkmode: any) => ({
    border: 'none',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: darkmode.dark ? '#888888' : theme.palette.background.paper,
    color: darkmode.dark ? '#e0e0e0' : 'blue',
    cursor: 'pointer',
  }),
  btnFail: (darkmode: any) => ({
    border: 'none',
    fontSize: '15px',
    outline: 'none',
    backgroundColor: darkmode.dark ? '#888888' : theme.palette.background.paper,
    color: darkmode.dark ? '#e0e0e0' : 'red',
    cursor: 'pointer',
  }),
}));

const MetaInfo: React.FC<IProps> = ({ quests, onFilteredQuests }) => {
  const dark = useSelector(
    (state: RootState) => state.userLogin.user?.darkmode,
  );
  const darkmode = {
    dark,
  };
  const classes = useStyles(darkmode);
  useEffect(() => {
    onFilteredQuests(quests);
  }, [quests]);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { id },
    } = e;
    switch (id) {
      case 'total': {
        return onFilteredQuests(quests);
      }
      case 'success': {
        const successQuests = quests?.filter((quest: any) => quest.checked);
        return onFilteredQuests(successQuests);
      }
      case 'fail': {
        const failQuests = quests?.filter((quest: any) => !quest.checked);
        return onFilteredQuests(failQuests);
      }
      default:
        return null;
    }
  };
  return (
    <div className={classes.info}>
      <button
        id="total"
        onClick={onClick}
        type="button"
        className={classes.total}
      >
        {`Total : ${quests?.length}`}
      </button>
      {' | '}
      <button
        id="success"
        onClick={onClick}
        type="button"
        className={classes.btnSuccess}
      >
        {`Success : ${quests?.filter((quest: any) => quest.checked).length}`}
      </button>
      {' | '}
      <button
        id="fail"
        onClick={onClick}
        type="button"
        className={classes.btnFail}
      >
        {`Not yet : ${quests?.filter((quest: any) => !quest.checked).length}`}
      </button>
    </div>
  );
};
export default MetaInfo;
