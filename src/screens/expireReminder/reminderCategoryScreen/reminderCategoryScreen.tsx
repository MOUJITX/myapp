import React from 'react';
import { useReminderCategoryHook } from './reminderCategoryHook';
import SelectList from '../../../components/basic/SelectList';
import Button, { ButtonShapeType } from '../../../components/basic/Button';
import { GoodCategory } from '../../../store/expireReminder/expireReminder.type';
import { SelectItem } from '../../../components/basic/SelectOptionList';
import { Props as TextLabelProps } from '../../../components/basic/TextLabel';

interface Props extends TextLabelProps {
  hideAll?: boolean;
  selected: string;
  onSelect: (value: string) => void;
}

export const ReminderCategoryScreen = (props: Props) => {
  const {
    input: { allCategories, allCategoriesHideAll },
    output: { addCategory, removeCategory, updateCategory },
  } = useReminderCategoryHook();

  const renderMoreButton = () => (
    <Button shape={ButtonShapeType.Square} size="small" label="+" shadow />
  );

  const transformCategory = (categories: GoodCategory[]): SelectItem[] => {
    return categories.map(c => {
      return {
        label: c.label,
        value: c.categoryID,
        isDefault: c.isDefault,
      };
    });
  };

  return (
    <SelectList
      {...props}
      selectList={transformCategory(
        props.hideAll ? allCategoriesHideAll : allCategories
      )}
      value={props.selected}
      onValueChange={props.onSelect}
      onItemAdd={item => addCategory(item.label)}
      onItemUpdate={item => updateCategory(item.value, item.label)}
      onItemRemove={value => removeCategory(value)}
      selectButton={props.hideAll ? undefined : renderMoreButton()}
      editable
    />
  );
};
