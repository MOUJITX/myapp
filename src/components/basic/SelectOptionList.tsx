import React, { RefObject, useRef, useState, useEffect } from 'react';
import CellGroup from './CellGroup';
import BottomSheet, { BottomSheetRef } from './BottomSheet';
import { StyleSheet, View } from 'react-native';
import Divider from './Divider';
import TextInput from './TextInput';
import Button from './Button';
import { t } from 'i18next';
import CellButton from './CellButton';
import { randomUUID } from '../../utils/utils';
import SpacingView from './SpacingView';

export interface SelectItem {
  value: string;
  label: string;
  isDefault?: boolean;
  valueData?: any;
}

export interface SelectItemCustomField {
  key: string;
  label: string;
  type: 'text';
}

export interface SelectOptionListProps {
  editable?: boolean;
  selectList: SelectItem[];
  value?: string;
  editBottomSheet?: SelectItemCustomField[];
  onValueChange?: (value: string) => void;
  onItemAdd?: (item: SelectItem) => void;
  onItemUpdate?: (item: SelectItem) => void;
  onItemRemove?: (value: string) => void;
}

export interface Props extends SelectOptionListProps {
  bottomSheetRef: RefObject<BottomSheetRef>;
}

const CustomFieldEditForm = (fields: SelectItemCustomField[], form?: any) => {
  const [customForm, setCustomForm] = useState<Record<string, string>>();

  const handleCustomFieldUpdate = (key: string, value: string) => {
    setCustomForm(prev => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const initCustomForm = fields.reduce(
      (acc, cur) => {
        acc[cur.key] = form ? form[cur.key] : '';
        return acc;
      },
      {} as Record<string, string>
    );
    setCustomForm(initCustomForm);
  }, [fields, form]);

  return (
    <SpacingView>
      <CellGroup card>
        {fields.map((field, index) => {
          if (field.type === 'text') {
            return (
              <TextInput
                key={index}
                inline
                label={field.label}
                value={customForm?.[field.key]}
                onValueChange={value =>
                  handleCustomFieldUpdate(field.key, value)
                }
              />
            );
          }
        })}
      </CellGroup>
      <Button
        label="保存"
        type="primary"
        onPress={() => console.log('customFieldEditForm', customForm)}
      />
    </SpacingView>
  );
};

export default (props: Props) => {
  const [editingItem, setEditingItem] = useState<SelectItem | null>();
  const [newItemLabel, setNewItemLabel] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSelect = (value: string) => {
    props.onValueChange && props.onValueChange(value);
    props.bottomSheetRef.current?.closeBottomSheet();
  };

  const handleAddCategory = () => {
    if (newItemLabel.trim()) {
      props.onItemAdd &&
        props.onItemAdd({ label: newItemLabel, value: randomUUID() });
      setIsAdding(false);
      setNewItemLabel('');
    }
  };

  const handleUpdateSelectItem = () => {
    if (editingItem && newItemLabel.trim()) {
      props.onItemUpdate &&
        props.onItemUpdate({ label: newItemLabel, value: editingItem.value });
      setIsAdding(false);
      setNewItemLabel('');
      setEditingItem(null);
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
    fields: SelectItemCustomField[]
  ) => (
    <BottomSheet ref={customFieldEditBottomSheetRef}>
      {CustomFieldEditForm(fields, editingItem?.valueData)}
    </BottomSheet>
  );

  return (
    <CellGroup>
      {props.selectList.map((item, index) => (
        <View key={index}>
          {editingItem?.value === item.value && !props.editBottomSheet ? (
            <TextInput
              style={styles.input}
              value={newItemLabel}
              autoFocus
              onValueChange={setNewItemLabel}
              right={() => renderConfirmButton(handleUpdateSelectItem)}
              onBlur={() => {
                setIsAdding(false);
                setNewItemLabel('');
                setEditingItem(null);
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
                props.editable && !item.isDefault
                  ? t('component.selectList.icon.remove')
                  : ''
              }
              label={item.label}
              onPress={() => handleSelect(item.value)}
              onRightPress={() => {
                if (props.editable && !item.isDefault) {
                  handleDeleteCategory(item.value);
                }
              }}
              onLongPress={() => {
                if (props.editable && !item.isDefault) {
                  setEditingItem(item);
                  setNewItemLabel(item.label);
                  setIsAdding(false);
                  props.editBottomSheet &&
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
          {isAdding && !props.editBottomSheet ? (
            <TextInput
              style={styles.input}
              value={newItemLabel}
              autoFocus
              onValueChange={setNewItemLabel}
              right={() => renderConfirmButton(handleAddCategory)}
              onBlur={() => {
                setIsAdding(false);
                setNewItemLabel('');
                setEditingItem(null);
              }}
            />
          ) : (
            <Button
              onPress={() => {
                setEditingItem(null);
                setIsAdding(true);
                props.editBottomSheet &&
                  customFieldEditBottomSheetRef.current?.openBottomSheet();
              }}
              label={t('component.selectList.add.button.label')}
              plain
            />
          )}
        </View>
      )}

      {props.editBottomSheet &&
        renderCustomFieldEditBottomSheet(props.editBottomSheet)}
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
