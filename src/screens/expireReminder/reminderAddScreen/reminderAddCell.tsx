import React from 'react';
import CellGroup from '../../../components/basic/CellGroup';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import ReminderAddCellHeader from './reminderAddCellHeader';
import { GoodItem } from '../../../store/expireReminder/expireReminder.type';
import NumberInput from '../../../components/basic/NumberInput';
import { calculateDays } from '../../../utils/datetime';

interface Props {
  itemNum: number;
  item: GoodItem;
  onDelete?: () => void;
  onCopy?: () => void;
  onAdd?: () => void;
  onValueChange?: (value: GoodItem) => void;
}

export default (props: Props) => {
  const handleValueChange = (key: keyof GoodItem, value: any) => {
    let newGoodItemCell: GoodItem = props.item;

    if (key === 'productionDate') {
      newGoodItemCell = {
        ...newGoodItemCell,
        productionDate: value,
        lifePeriod: calculateDays(value, newGoodItemCell.expireDate),
      };
    }

    if (key === 'lifePeriod') {
      const newDate = new Date(newGoodItemCell.productionDate ?? new Date());
      newDate.setDate(newDate.getDate() + value);
      newGoodItemCell = {
        ...newGoodItemCell,
        lifePeriod: value,
        expireDate: newDate,
      };
    }

    if (key === 'expireDate') {
      newGoodItemCell = {
        ...newGoodItemCell,
        expireDate: value,
        lifePeriod: calculateDays(value, newGoodItemCell.productionDate),
      };
    }

    props.onValueChange && props.onValueChange(newGoodItemCell);
  };

  return (
    <CellGroup
      card
      header={
        <ReminderAddCellHeader
          index={props.itemNum}
          onAdd={props.onAdd}
          onDelete={props.onDelete}
          onCopy={props.onCopy}
        />
      }
    >
      <DatetimePicker
        inline
        label="生产日期"
        value={props.item.productionDate}
        maxDate={props.item.expireDate}
        onValueChange={value => handleValueChange('productionDate', value)}
      />
      <NumberInput
        inline
        label="保质期 (天)"
        min={0}
        value={props.item.lifePeriod}
        onValueChange={value => handleValueChange('lifePeriod', value)}
      />
      <DatetimePicker
        inline
        label="有效期至"
        value={props.item.expireDate}
        minDate={props.item.productionDate}
        onValueChange={value => handleValueChange('expireDate', value)}
      />
    </CellGroup>
  );
};
