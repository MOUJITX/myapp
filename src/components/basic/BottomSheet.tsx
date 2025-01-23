import React, { forwardRef, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { commonStyles } from '../../styles';

interface Props {
  children: React.ReactNode;
}

const backdrop = () => {
  return <View style={styles.backdrop} />;
};

export default forwardRef<BottomSheetModal, Props>((props, ref) => {
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheetModal
      ref={ref}
      onChange={handleSheetChanges}
      snapPoints={['90%']}
      index={1}
      backgroundStyle={styles.bottomSheetBackground}
      backdropComponent={backdrop}
    >
      <BottomSheetView style={styles.contentContainer}>
        {props.children}
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: commonStyles.color.gray2,
  },
  contentContainer: {
    flex: 1,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: commonStyles.color.gray8 + '80',
  },
});
