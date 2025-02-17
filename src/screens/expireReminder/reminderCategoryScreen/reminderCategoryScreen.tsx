import React, { RefObject, useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import SpacingView from '../../../components/basic/SpacingView';
import CellGroup from '../../../components/basic/CellGroup';
import Divider from '../../../components/basic/Divider';
import CellButton from '../../../components/basic/CellButton';
import Button from '../../../components/basic/Button';
import TextInput from '../../../components/basic/TextInput';
import { useReminderCategoryHook } from './reminderCategoryHook';
import { GoodCategory } from '../../../store/expireReminder/expireReminder.type';
import { t } from 'i18next';
import { BottomSheetRef } from '../../../components/basic/BottomSheet';

interface Props {
  bottomSheetRef: RefObject<BottomSheetRef>;
  selected: string;
  onSelect: (category: string) => void;
  hideAll?: boolean;
}

export const ReminderCategoryScreen = (props: Props) => {
  const {
    input: { allCategories, allCategoriesHideAll },
    output: { addCategory, removeCategory, updateCategory },
  } = useReminderCategoryHook();

  const [categories, setCategories] = useState<GoodCategory[]>(
    props.hideAll ? allCategoriesHideAll : allCategories
  );
  const [editingCategory, setEditingCategory] = useState<GoodCategory | null>();
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    setCategories(props.hideAll ? allCategoriesHideAll : allCategories);
  }, [allCategories, allCategoriesHideAll, props.hideAll]);

  const handleSelect = (value: string) => {
    props.onSelect(value);
    props.bottomSheetRef.current?.closeBottomSheet();
  };

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName);
      setIsAdding(false);
      setNewCategoryName('');
    }
  };

  const handleDeleteCategory = (value: string) => {
    removeCategory(value);
  };

  const handleUpdateCategory = () => {
    if (editingCategory && newCategoryName.trim()) {
      updateCategory(editingCategory.categoryID, newCategoryName);
      setIsAdding(false);
      setNewCategoryName('');
      setEditingCategory(null);
    }
  };

  const renderConfirmButton = (onPress: () => void) => {
    return (
      <Button label={t('common.save.label')} type="success" onPress={onPress} />
    );
  };

  return (
    <SpacingView>
      <CellGroup>
        {categories.map((category, index) => (
          <View key={index}>
            {editingCategory?.categoryID === category.categoryID ? (
              <TextInput
                style={styles.input}
                value={newCategoryName}
                autoFocus
                onValueChange={setNewCategoryName}
                right={() => renderConfirmButton(handleUpdateCategory)}
                onBlur={() => {
                  setIsAdding(false);
                  setNewCategoryName('');
                  setEditingCategory(null);
                }}
              />
            ) : (
              <CellButton
                leftIcon={
                  props.selected === category.categoryID
                    ? t('expireReminder.category.selector.icon.selected')
                    : t('expireReminder.category.selector.icon.unselected')
                }
                rightIcon={
                  category.isDefault
                    ? ''
                    : t('expireReminder.category.selector.icon.remove')
                }
                label={category.label}
                onPress={() => handleSelect(category.categoryID)}
                onRightPress={() => {
                  if (!category.isDefault) {
                    handleDeleteCategory(category.categoryID);
                  }
                }}
                onLongPress={() => {
                  if (!category.isDefault) {
                    setEditingCategory(category);
                    setNewCategoryName(category.label);
                    setIsAdding(false);
                  }
                }}
              />
            )}
            <Divider />
          </View>
        ))}

        <View>
          {isAdding ? (
            <TextInput
              style={styles.input}
              placeholder={t('expireReminder.category.add.input.placeholder')}
              value={newCategoryName}
              autoFocus
              onValueChange={setNewCategoryName}
              right={() => renderConfirmButton(handleAddCategory)}
              onBlur={() => {
                setIsAdding(false);
                setNewCategoryName('');
                setEditingCategory(null);
              }}
            />
          ) : (
            <Button
              onPress={() => {
                setEditingCategory(null);
                setIsAdding(true);
              }}
              label={t('expireReminder.category.add.button.label')}
              plain
            />
          )}
        </View>
      </CellGroup>
    </SpacingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  input: {
    borderBottomWidth: 1,
    borderColor: '#4CAF50',
    flex: 1,
  },
});
