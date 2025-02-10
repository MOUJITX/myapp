import React from 'react';
import { FlatList, View } from 'react-native';
import SwipeRow, { swipeRowConfig } from './SwipeRow';

export interface Props extends swipeRowConfig {
  renderItem?: ({ item }: { item: any }) => React.ReactNode;
  data?: ArrayLike<any>;
}

export default (props: Props) => {
  const renderSwipeRow = ({ item }: { item: any }) => (
    <SwipeRow {...props} onPressItem={item}>
      {props.renderItem && props.renderItem({ item })}
    </SwipeRow>
  );

  return (
    <View>
      <FlatList
        data={props.data}
        renderItem={renderSwipeRow}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        // refreshControl={<RefreshControl refreshing />}
      />
    </View>
  );
};
