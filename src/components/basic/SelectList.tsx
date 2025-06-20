import { t } from 'i18next';
import { ReactNode, useRef } from 'react';
import { View } from 'react-native';

import BottomSheet, { BottomSheetRef } from './BottomSheet';
import { SelectOptionListProps } from './SelectOptionList';
import SelectOptionList from './SelectOptionList';
import { Props as TextLabelProps } from './TextLabel';
import TextLabel from './TextLabel';

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
            props.value && valueToLabel(props.value)
              ? valueToLabel(props.value)
              : (props.placeholder ?? t('component.selectList.placeholder'))
          }
        />
      )}

      <BottomSheet
        ref={SelectBottomSheetRef}
        autoSize={!props.editable || !!props.customFormSetting}>
        <SelectOptionList bottomSheetRef={SelectBottomSheetRef} {...props} />
      </BottomSheet>
    </View>
  );
};
