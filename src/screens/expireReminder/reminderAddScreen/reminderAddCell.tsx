import React, { useState } from 'react';
import CellGroup from '../../../components/basic/CellGroup';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import ReminderAddCellHeader from './reminderAddCellHeader';
import { GoodItem } from '../../../store/expireReminder/expireReminder.type';
import NumberInput from '../../../components/basic/NumberInput';
import { calculateDays } from '../../../utils/datetime';
import { useComponentMount } from '../../../utils/componentMount';

interface Props {
  itemNum: number;
  item: GoodItem;
  onDelete?: () => void;
  onCopy?: () => void;
  onAdd?: () => void;
  onValueChange?: (value: GoodItem) => void;
}

export default (props: Props) => {
  const [goodItemCell, setGoodItemCell] = useState<GoodItem>(props.item);

  useComponentMount(() => {
    setGoodItemCell(props.item);
    console.log('goodItemCell', props.item);
  });

  const handleValueChange = (key: keyof GoodItem, value: any) => {
    let newGoodItemCell: GoodItem = goodItemCell;

    if (key === 'productionDate') {
      newGoodItemCell = {
        ...goodItemCell,
        productionDate: value,
        lifePeriod: calculateDays(value, goodItemCell.expireDate),
      };
    }

    if (key === 'lifePeriod') {
      const newDate = new Date(goodItemCell.productionDate ?? new Date());
      newDate.setDate(newDate.getDate() + value);
      newGoodItemCell = {
        ...goodItemCell,
        lifePeriod: value,
        expireDate: newDate,
      };
    }

    if (key === 'expireDate') {
      newGoodItemCell = {
        ...goodItemCell,
        expireDate: value,
        lifePeriod: calculateDays(value, goodItemCell.productionDate),
      };
    }

    setGoodItemCell(newGoodItemCell);
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
        maxDate={goodItemCell.expireDate}
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
        minDate={goodItemCell.productionDate}
        onValueChange={value => handleValueChange('expireDate', value)}
      />
    </CellGroup>
  );
};
