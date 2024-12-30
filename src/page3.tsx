import React from 'react';
import {View, Text} from 'react-native';
import {AppNavigationList} from './navigation/AppNavigationList';
import {StackScreenProps} from '@react-navigation/stack';

type Props = StackScreenProps<AppNavigationList, 'PageC'>;

export const PageC = (props: Props) => {
  const initMsg = props.route.params.initMsg;

  return (
    <View>
      <Text>page 3</Text>
      <Text>{initMsg}</Text>
    </View>
  );
};
