import React, { useState } from 'react';
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
  interface GoodItemCell extends GoodItem {
    lifePeriod: number;
  }

  const [goodItemCell, setGoodItemCell] = useState<GoodItemCell>({
    ...props.item,
    lifePeriod: calculateDays(props.item.productionDate, props.item.expireDate),
  });

  const handleValueChange = (key: keyof GoodItemCell, value: any) => {
    let newGoodItemCell: GoodItemCell = { ...goodItemCell };

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
        value={goodItemCell.productionDate}
        maxDate={goodItemCell.expireDate}
        onValueChange={value => handleValueChange('productionDate', value)}
      />
      <NumberInput
        inline
        label="保质期 (天)"
        min={0}
        value={goodItemCell.lifePeriod}
        onValueChange={value => handleValueChange('lifePeriod', value)}
      />
      <DatetimePicker
        inline
        label="有效期至"
        value={goodItemCell.expireDate}
        minDate={goodItemCell.productionDate}
        onValueChange={value => handleValueChange('expireDate', value)}
      />
    </CellGroup>
  );
};
