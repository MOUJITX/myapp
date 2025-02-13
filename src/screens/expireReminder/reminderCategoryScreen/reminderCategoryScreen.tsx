import React from 'react';
import { Text } from 'react-native';
import SpacingView from '../../../components/basic/SpacingView';
import CellGroup from '../../../components/basic/CellGroup';

export const ReminderCategoryScreen = () => {
  return (
    <SpacingView>
      <Text>Reminder Category</Text>
      <CellGroup />
      <CellGroup shadow card />
    </SpacingView>
  );
};
