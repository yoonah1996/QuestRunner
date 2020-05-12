/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

interface IProps {
  quests: any;
  onFilteredQuests: Function;
}
const useStyles = makeStyles((theme) => ({
  info: {
    margin: '15px 0',
    fontSize: '15px',
    boxShadow: theme.shadows[5],
    backgroundColor: theme.palette.background.paper,
    padding: '0 15px',
    borderRadius: '5px',
  },
  total: {
    border: 'none',
    fontSize: '15px',
    outline: 'none',
    transition: 'background-color .5s',
    '&:hover': {
      backgroundColor: 'rgba(241,227,203,0.5)',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  },
  btnSuccess: {
    border: 'none',
    color: 'blue',
    fontSize: '15px',
    outline: 'none',
    transition: 'background-color .5s',
    '&:hover': {
      backgroundColor: 'rgba(241,227,203,0.5)',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  },
  btnFail: {
    border: 'none',
    color: 'red',
    fontSize: '15px',
    outline: 'none',
    transition: 'background-color .5s',
    '&:hover': {
      backgroundColor: 'rgba(241,227,203,0.5)',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  },
}));

const MetaInfo: React.FC<IProps> = ({ quests, onFilteredQuests }) => {
  const classes = useStyles();
  const [metaInfoQuests, setMetaInfiQuests] = useState([]);
  useEffect(() => {
    onFilteredQuests(quests);
  }, [quests]);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // const id = e.currentTarget.id;
    const {
      currentTarget: { id },
    } = e;
    switch (id) {
      case 'total': {
        return onFilteredQuests(quests);
      }
      case 'success': {
        const successQuests = quests?.filter((quest: any) => quest.completed);
        return onFilteredQuests(successQuests);
      }
      case 'fail': {
        const failQuests = quests?.filter((quest: any) => !quest.completed);
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
        {`Success : ${quests?.filter((quest: any) => quest.completed).length}`}
      </button>
      {' | '}
      <button
        id="fail"
        onClick={onClick}
        type="button"
        className={classes.btnFail}
      >
        {`Fail : ${quests?.filter((quest: any) => !quest.completed).length}`}
      </button>
    </div>
  );
};
export default MetaInfo;
