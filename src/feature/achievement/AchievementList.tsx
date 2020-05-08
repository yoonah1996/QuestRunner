/* eslint-disable react/prop-types */
import React from 'react';
import { QuestItem } from '../common/interfaces';

interface IProps {
  quest: QuestItem;
}

const AchievementList: React.FC<IProps> = ({ quest }) => {
  console.log(quest);
  return <>{quest.contents}</>;
};

export default AchievementList;
