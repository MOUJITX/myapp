import React, { useRef } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { SwipeableMethods } from 'react-native-gesture-handler/lib/typescript/components/ReanimatedSwipeable';

import SwipeRow, { swipeRowConfig } from './SwipeRow';

export interface Props extends swipeRowConfig {
  renderItem?: ({ item }: { item: any }) => React.ReactNode;
  data?: ArrayLike<any>;
}

export default (props: Props) => {
  const currentOpenSwipeRowRef = useRef<SwipeableMethods | null>(null);

  const handleSwipeableOpen = (instance: SwipeableMethods) => {
    if (
      currentOpenSwipeRowRef.current &&
      currentOpenSwipeRowRef.current !== instance
    ) {
      currentOpenSwipeRowRef.current.close();
    }
    currentOpenSwipeRowRef.current = instance;
  };

  const handleSwipeableClose = (instance: SwipeableMethods) => {
    if (currentOpenSwipeRowRef.current === instance) {
      currentOpenSwipeRowRef.current = null;
    }
  };

  const renderSwipeRow = ({ item }: { item: any }) => (
    <SwipeRow
      {...props}
      onPressItem={item}
      onSwipeableClose={handleSwipeableClose}
      onSwipeableOpen={handleSwipeableOpen}>
      {props.renderItem && props.renderItem({ item })}
    </SwipeRow>
  );

  return (
    <FlatList
      style={styles.container}
      data={props.data}
      renderItem={renderSwipeRow}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      // refreshControl={<RefreshControl refreshing />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
