import React, { RefObject, useState } from 'react';
import CellGroup from './CellGroup';
import { BottomSheetRef } from './BottomSheet';
import { StyleSheet, View } from 'react-native';
import Divider from './Divider';
import TextInput from './TextInput';
import Button from './Button';
import { t } from 'i18next';
import CellButton from './CellButton';
import { randomUUID } from '../../utils/utils';

export interface SelectItem {
  label: string;
  value: string;
  isDefault?: boolean;
}

export interface SelectOptionListProps {
  editable?: boolean;
  selectList: SelectItem[];
  value?: string;
  onValueChange?: (value: string) => void;
  onItemAdd?: (item: SelectItem) => void;
  onItemUpdate?: (item: SelectItem) => void;
  onItemRemove?: (value: string) => void;
}

export interface Props extends SelectOptionListProps {
  bottomSheetRef: RefObject<BottomSheetRef>;
}

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

  return (
    <CellGroup>
      {props.selectList.map((item, index) => (
        <View key={index}>
          {editingItem?.value === item.value ? (
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
                }
              }}
            />
          )}
          <Divider />
        </View>
      ))}

      {props.editable && (
        <View>
          {isAdding ? (
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
              }}
              label={t('component.selectList.add.button.label')}
              plain
            />
          )}
        </View>
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
