import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { StyleSheet, View } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { commonStyles } from '../../styles';

interface Props {
  children: React.ReactNode;
  autoSize?: boolean;
  hideHeader?: boolean;
}

export interface BottomSheetRef {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
}

const BottomSheet: ForwardRefRenderFunction<BottomSheetRef, Props> = (
  props,
  ref
) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
    setIsOpen(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
    setIsOpen(false);
  };

  const backdrop = () => {
    return (
      <View style={styles(isOpen).backdrop} onTouchEnd={closeBottomSheet} />
    );
  };

  useImperativeHandle(
    ref,
    (): BottomSheetRef => ({
      openBottomSheet,
      closeBottomSheet,
    })
  );

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={props.autoSize ? undefined : ['90%']}
      backgroundStyle={styles(isOpen).bottomSheetBackground}
      backdropComponent={backdrop}
      enableDynamicSizing={props.autoSize ?? false}
      handleComponent={props.hideHeader ? null : undefined}
    >
      <BottomSheetView style={styles(isOpen).contentContainer}>
        {props.children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = (isOpen: boolean) =>
  StyleSheet.create({
    bottomSheetBackground: {
      backgroundColor: commonStyles.color.gray2,
    },
    contentContainer: {
      flex: 1,
    },
    backdrop: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: commonStyles.color.gray8,
      opacity: isOpen ? 0.6 : 0,
    },
  });

export default forwardRef<BottomSheetRef, Props>(BottomSheet);
