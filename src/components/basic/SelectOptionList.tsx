import { t } from 'i18next';
import React, { RefObject, useRef, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { randomUUID } from '../../utils/utils';

import BottomSheet, { BottomSheetRef } from './BottomSheet';
import Button from './Button';
import CellButton from './CellButton';
import CellGroup from './CellGroup';
import CustomForm, { CustomFormField } from './CustomForm';
import Divider from './Divider';
import TextInput from './TextInput';

export interface SelectItem {
  value: string;
  label: string;
  isDefault?: boolean;
  valueData?: any;
}

export interface SelectOptionListProps {
  editable?: boolean;
  selectList: SelectItem[];
  value?: string;
  customFormSetting?: { fields: CustomFormField[]; label: string };
  valueIsLabel?: boolean;
  onValueChange?: (value: string) => void;
  onItemChange?: (item: SelectItem) => void;
  onItemAdd?: (item: SelectItem) => void;
  onItemUpdate?: (item: SelectItem) => void;
  onItemRemove?: (value: string) => void;
}

export interface Props extends SelectOptionListProps {
  bottomSheetRef: RefObject<BottomSheetRef>;
}

export default (props: Props) => {
  const [editingItem, setEditingItem] = useState<SelectItem | undefined>();
  const [newItemLabel, setNewItemLabel] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSelect = (item: SelectItem) => {
    props.onValueChange && props.onValueChange(item.value);
    props.onItemChange && props.onItemChange(item);
    props.bottomSheetRef.current?.closeBottomSheet();
  };

  const handleAddSelectItem = (item?: SelectItem) => {
    if (item || newItemLabel.trim()) {
      const label = item?.label ?? newItemLabel;
      const newItem: SelectItem = {
        value: item?.value ?? (props.valueIsLabel ? label : randomUUID()),
        label,
        valueData: item?.valueData ?? undefined,
      };

      props.onItemAdd && props.onItemAdd(newItem);
      setIsAdding(false);
      setNewItemLabel('');
      setEditingItem(undefined);
    }
  };

  const handleUpdateSelectItem = (item?: SelectItem) => {
    if (item || editingItem) {
      const label = item?.label ?? newItemLabel;
      const newItem: SelectItem = {
        value:
          item?.value ??
          editingItem?.value ??
          (props.valueIsLabel ? label : randomUUID()),
        label,
        valueData: item?.valueData ?? undefined,
      };

      props.onItemUpdate && props.onItemUpdate(newItem);
      setIsAdding(false);
      setNewItemLabel('');
      setEditingItem(undefined);
    }
  };

  const handleDeleteCategory = (value: string) => {
    props.onItemRemove && props.onItemRemove(value);
  };

  const renderConfirmButton = (onPress: () => void) => {
    return (
      <Button label={t('common.save.label')} type="success" onPress={onPress} />
    );
  };

  const customFieldEditBottomSheetRef = useRef<BottomSheetRef>(null);

  const renderCustomFieldEditBottomSheet = (
    fields: CustomFormField[],
    handleAction: (selectItem: SelectItem) => void,
  ) => {
    const handleValueChange = (form: any) => {
      const newSelectItem: SelectItem = {
        value:
          editingItem?.value ??
          (props.valueIsLabel ? newItemLabel : randomUUID()),
        label: newItemLabel,
        valueData: form,
      };
      handleAction(newSelectItem);
      setEditingItem(undefined);
      setIsAdding(false);
      setNewItemLabel('');
      customFieldEditBottomSheetRef.current?.closeBottomSheet();
    };

    return (
      <BottomSheet ref={customFieldEditBottomSheetRef}>
        <CustomForm
          fields={fields}
          form={editingItem?.valueData}
          formLabel={props.customFormSetting?.label}
          onValueChange={handleValueChange}
          onFormLabelChange={setNewItemLabel}
        />
      </BottomSheet>
    );
  };

  return (
    <CellGroup>
      {props.selectList.map((item, index) => (
        <View key={index}>
          {editingItem?.value === item.value && !props.customFormSetting ? (
            <TextInput
              style={styles.input}
              value={newItemLabel}
              autoFocus
              onValueChange={setNewItemLabel}
              right={() => renderConfirmButton(handleUpdateSelectItem)}
              onBlur={() => {
                setIsAdding(false);
                setNewItemLabel('');
                setEditingItem(undefined);
              }}
            />
          ) : (
            <CellButton
              leftIcon={
                props.value === item.value
                  ? t('component.selectList.icon.selected')
                  : t('component.selectList.icon.unSelected')
              }
              rightIcon={
                props.editable && !item.isDefault && props.value !== item.value
                  ? t('component.selectList.icon.remove')
                  : ''
              }
              label={item.label}
              onPress={() => handleSelect(item)}
              onRightPress={() => {
                if (
                  props.editable &&
                  !item.isDefault &&
                  props.value !== item.value
                ) {
                  handleDeleteCategory(item.value);
                }
              }}
              onLongPress={() => {
                if (props.editable && !item.isDefault) {
                  setEditingItem(item);
                  setNewItemLabel(item.label);
                  setIsAdding(false);
                  props.customFormSetting &&
                    customFieldEditBottomSheetRef.current?.openBottomSheet();
                }
              }}
            />
          )}
          <Divider />
        </View>
      ))}

      {props.editable && (
        <View>
          {isAdding && !props.customFormSetting ? (
            <TextInput
              style={styles.input}
              value={newItemLabel}
              autoFocus
              onValueChange={setNewItemLabel}
              right={() => renderConfirmButton(handleAddSelectItem)}
              onBlur={() => {
                setIsAdding(false);
                setNewItemLabel('');
                setEditingItem(undefined);
              }}
            />
          ) : (
            <Button
              onPress={() => {
                setEditingItem(undefined);
                setIsAdding(true);
                props.customFormSetting &&
                  customFieldEditBottomSheetRef.current?.openBottomSheet();
              }}
              label={t('component.selectList.add.button.label')}
              plain
            />
          )}
        </View>
      )}

      {props.customFormSetting &&
        renderCustomFieldEditBottomSheet(
          props.customFormSetting.fields,
          isAdding ? handleAddSelectItem : handleUpdateSelectItem,
        )}
    </CellGroup>
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: '#4CAF50',
    flex: 1,
  },
});
