import React, { ReactNode, useRef } from 'react';
import { View } from 'react-native';
import TextLabel from './TextLabel';
import { Props as TextLabelProps } from './TextLabel';
import { SelectOptionListProps } from './SelectOptionList';
import BottomSheet, { BottomSheetRef } from './BottomSheet';
import SelectOptionList from './SelectOptionList';
import { t } from 'i18next';
import SpacingView from './SpacingView';

export interface Props extends TextLabelProps, SelectOptionListProps {
  placeholder?: string;
  selectButton?: ReactNode;
}

export default (props: Props) => {
  const SelectBottomSheetRef = useRef<BottomSheetRef>(null);

  const openSelectScreenBottomSheet = () => {
    SelectBottomSheetRef.current?.openBottomSheet();
  };

  const valueToLabel = (value: string) =>
    props.selectList.find(i => i.value === value)?.label;

  return (
    <View>
      {props.selectButton ? (
        <View onTouchEnd={openSelectScreenBottomSheet}>
          {props.selectButton}
        </View>
      ) : (
        <TextLabel
          {...props}
          textColor="primary"
          onTextPress={openSelectScreenBottomSheet}
          value={
            props.value
              ? valueToLabel(props.value)
              : (props.placeholder ?? t('component.selectList.placeholder'))
          }
        />
      )}

      <BottomSheet ref={SelectBottomSheetRef} autoSize={!props.editable}>
        <SpacingView>
          <SelectOptionList bottomSheetRef={SelectBottomSheetRef} {...props} />
        </SpacingView>
      </BottomSheet>
    </View>
  );
};
