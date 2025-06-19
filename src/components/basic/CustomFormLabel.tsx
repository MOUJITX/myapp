import { t } from 'i18next';
import React, { useRef } from 'react';
import { View } from 'react-native';

import BottomSheet, { BottomSheetRef } from './BottomSheet';
import CustomForm, { CustomFormField } from './CustomForm';
import TextLabel from './TextLabel';
import { Props as TextLabelProps } from './TextLabel';

interface Props extends TextLabelProps {
  placeholder?: string;
  valueLabel?: string;
  formFields: CustomFormField[];
  formValue?: any;
  onValueChange?: (form: any) => void;
}

export default (props: Props) => {
  const editBottomSheetRef = useRef<BottomSheetRef>(null);

  const openEditBottomSheet = () => {
    editBottomSheetRef.current?.openBottomSheet();
  };

  const handleValueChange = (form: any) => {
    props.onValueChange?.(form);
    editBottomSheetRef.current?.closeBottomSheet();
  };

  const renderEditBottomSheet = () => (
    <BottomSheet ref={editBottomSheetRef}>
      <CustomForm
        fields={props.formFields}
        form={props.formValue}
        onValueChange={handleValueChange}
      />
    </BottomSheet>
  );

  return (
    <View>
      <TextLabel
        {...props}
        textColor="primary"
        onTextPress={openEditBottomSheet}
        value={
          props.valueLabel
            ? props.valueLabel
            : (props.placeholder ?? t('component.textInput.placeholder'))
        }
      />

      {renderEditBottomSheet()}
    </View>
  );
};
