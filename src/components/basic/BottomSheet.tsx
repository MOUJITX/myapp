import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import { StyleSheet, View, BackHandler, Keyboard, Text } from 'react-native';
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { commonStyles } from '../../styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { t } from 'i18next';

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
    bottomSheetBackground: {
      backgroundColor: commonStyles.color.gray2,
    },
    contentContainer: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      paddingHorizontal: commonStyles.spacings.medium,
      marginVertical: -commonStyles.spacings.smallX,
    },
    headerLabel: {
      fontSize: commonStyles.fontSize.large5X,
      color: commonStyles.color.blue,
      fontWeight: '200',
    },

    backdrop: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: commonStyles.backgroundColor.backDrop,
      opacity: isOpen ? commonStyles.backgroundColor.backDropOpacity : 0,
    },
  });

export default forwardRef<BottomSheetRef, Props>(BottomSheet);
