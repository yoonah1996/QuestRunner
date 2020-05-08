/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { QuestItem } from '../common/interfaces';

const quests = [
  {
    _id: 58472052,
    created_at: '20200412-130304',
    title: 'title1',
    contents: 'contents1',
    due_date: '20200413-110304',
    checked: true,
    completed: false,
  },
  {
    _id: 58472053,
    created_at: '20200412-200948',
    title: 'title2',
    contents: 'contents2',
    due_date: '20200414-120000',
    checked: false,
    completed: true,
  },
  {
    _id: 58472054,
    created_at: '20200412-200948',
    title: 'title3',
    contents: 'contents3',
    due_date: '20200415-120000',
    checked: false,
    completed: false,
  },
];

interface IProps {
  quest: QuestItem;
}

const AchievementList: React.FC<IProps> = ({ quest }) => {
  console.log(quest);
  return <>{quest.contents}</>;
};

export default AchievementList;
