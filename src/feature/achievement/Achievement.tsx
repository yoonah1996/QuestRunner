/* eslint-disable no-unused-vars */
/* eslint-disable radix */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import { Fade } from '@material-ui/core';
import DateRange from './DateRange';
import CustomPaginationActionTable from './CustomPaginationActionsTable';
import { RootState } from '..';
import { QuestItem } from '../common/interfaces';
import MetaInfo from './MetaInfo';

interface range {
  start: string;
  end: string;
}

const useStyles = makeStyles(() => ({
  root: {
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0px',
    marginBottom: '10px',
    flexGrow: 1,
  },
  board: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '70vw',
  },
}));

const Achievement: React.FC = () => {
  const [range, setRange] = useState<range>({
    start: '',
    end: '',
  });
  const [quests, setQuests] = useState<QuestItem[] | undefined>([]);
  const [filiteredQuests, setFiliteredQuests] = useState<
    QuestItem[] | undefined
  >([]);
  const user = useSelector((state: RootState) => state.userLogin.user);

  const questsFromStore = user?.quests;
  const todoListsFromStore = user?.todolist;

  const classes = useStyles();

  const questsFromStoreFilter = questsFromStore?.filter(
    (quest) => quest !== null,
  );
  const todoListsFromStoreFilter = todoListsFromStore?.filter(
    (todo) => todo !== null,
  );
  let allUserLists = questsFromStoreFilter?.concat(todoListsFromStoreFilter!);

  const changeRange = (checkDate: any) => {
    setRange({
      start: checkDate.start,
      end: checkDate.end,
    });
  };
  const getQuestFromRedux = useCallback(
    (start: string, end: string) => {
      let filterdQuset: any[] | undefined;
      if (!start && !end) {
        allUserLists = questsFromStoreFilter?.concat(todoListsFromStoreFilter!);
        filterdQuset = allUserLists?.map((quest) => ({
          ...quest,
          due_date: quest.due_date
            ? parseInt(quest.due_date.slice(0, 8))
            : null,
        }));
      } else {
        filterdQuset = allUserLists
          ?.filter((quest) => {
            if (quest.due_date === null) {
              return null;
            }
            const date = parseInt(quest.due_date.slice(0, 8));
            return parseInt(start) <= date && date <= parseInt(end);
          })
          .map((quest: any) => ({
            ...quest,
            due_date: quest.due_date
              ? parseInt(quest.due_date.slice(0, 8))
              : null,
          }));
      }
      return setQuests(filterdQuset);
    },
    [range],
  );
  // const getQuestFromRedux = (start: string, end: string) => {
  //   let filterdQuset: any[] | undefined;
  //   if (!start && !end) {
  //     allUserLists = questsFromStoreFilter?.concat(todoListsFromStoreFilter!);
  //     filterdQuset = allUserLists?.map((quest) => ({
  //       ...quest,
  //       due_date: quest.due_date ? parseInt(quest.due_date.slice(0, 8)) : null,
  //     }));
  //   } else {
  //     filterdQuset = allUserLists
  //       ?.filter((quest) => {
  //         if (quest.due_date === null) {
  //           return null;
  //         }
  //         const date = parseInt(quest.due_date.slice(0, 8));
  //         return parseInt(start) <= date && date <= parseInt(end);
  //       })
  //       .map((quest: any) => ({
  //         ...quest,
  //         due_date: quest.due_date
  //           ? parseInt(quest.due_date.slice(0, 8))
  //           : null,
  //       }));
  //   }
  //   return setQuests(filterdQuset);
  // };
  const onFilteredQuests = (filteredQuests: any) => {
    setFiliteredQuests(filteredQuests);
  };
  useEffect(() => {
    getQuestFromRedux(range.start, range.end);
  }, [getQuestFromRedux, range.end, range.start]);
  return (
    <Fade in>
      <div className={classes.root}>
        <MetaInfo quests={quests} onFilteredQuests={onFilteredQuests} />
        <div className={classes.board}>
          <DateRange changeRange={changeRange} />
          <CustomPaginationActionTable quests={filiteredQuests} />
        </div>
      </div>
    </Fade>
  );
};

export default Achievement;
