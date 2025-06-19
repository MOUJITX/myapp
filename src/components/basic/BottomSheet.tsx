import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { t } from 'i18next';
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { BackHandler, Keyboard, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { commonStyles } from '../../styles';

interface Props {
  children: React.ReactNode;
  autoSize?: boolean;
  hideHeader?: boolean;
  headerRight?: {
    label: string;
    onPress: () => void;
  };
}

export interface BottomSheetRef {
  openBottomSheet: () => void;
  closeBottomSheet: () => void;
}

const BottomSheet: ForwardRefRenderFunction<BottomSheetRef, Props> = (
  props,
  ref,
) => {
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [isOpen, setIsOpen] = useState(false);

  const { top } = useSafeAreaInsets();

  const openBottomSheet = () => {
    bottomSheetRef.current?.present();
    Keyboard.dismiss();
    setIsOpen(true);
  };

  const closeBottomSheet = () => {
    bottomSheetRef.current?.dismiss();
    Keyboard.dismiss();
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
    }),
  );

  useEffect(() => {
    const backAction = () => {
      if (isOpen) {
        closeBottomSheet();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // 清理事件监听器
  }, [isOpen]);

  return (
    <BottomSheetModal
      ref={bottomSheetRef}
      snapPoints={props.autoSize ? undefined : ['100%']}
      backgroundStyle={styles(isOpen).bottomSheetBackground}
      backdropComponent={backdrop}
      enableDynamicSizing={props.autoSize ?? false}
      handleComponent={props.hideHeader ? null : undefined}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      topInset={top}
      enableHandlePanningGesture={true}
      enablePanDownToClose={false}>
      <BottomSheetView style={styles(isOpen).contentContainer}>
        {!props.hideHeader && (
          <View style={styles(isOpen).header}>
            <Text onPress={closeBottomSheet} style={styles(isOpen).headerLabel}>
              {t('common.close.icon')}
            </Text>
            {props.headerRight && (
              <Text
                onPress={props.headerRight?.onPress}
                style={styles(isOpen).headerLabel}>
                {props.headerRight.label}
              </Text>
            )}
          </View>
        )}
        {props.children}
      </BottomSheetView>
    </BottomSheetModal>
  );
};

const styles = (isOpen: boolean) =>
  StyleSheet.create({
    backdrop: {
      backgroundColor: commonStyles.backgroundColor.backDrop,
      height: '100%',
      opacity: isOpen ? commonStyles.backgroundColor.backDropOpacity : 0,
      position: 'absolute',
      width: '100%',
    },
    bottomSheetBackground: {
      backgroundColor: commonStyles.color.gray2,
    },
    contentContainer: {
      flex: 1,
    },
    header: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',

      marginVertical: -commonStyles.spacings.smallX,
      paddingHorizontal: commonStyles.spacings.medium,
    },

    headerLabel: {
      color: commonStyles.color.blue,
      fontSize: commonStyles.fontSize.large5X,
      fontWeight: '200',
    },
  });

export default forwardRef<BottomSheetRef, Props>(BottomSheet);
