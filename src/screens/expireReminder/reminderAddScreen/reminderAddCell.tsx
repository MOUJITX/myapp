import React, { useState } from 'react';
import CellGroup from '../../../components/basic/CellGroup';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import ReminderAddCellHeader from './reminderAddCellHeader';
import { GoodItem } from '../../../store/expireReminder/expireReminder.type';
import NumberInput from '../../../components/basic/NumberInput';

interface Props {
  index: number;
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

  const calculateDays = (beforeDay?: Date, afterDay?: Date) => {
    if (!beforeDay || !afterDay) {
      return 0;
    }

    const diffTime = Math.abs(afterDay.getTime() - beforeDay.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const [goodItemCell, setGoodItemCell] = useState<GoodItemCell>({
    ...props.item,
    lifePeriod: calculateDays(props.item.productionDate, props.item.expireDate),
  });

  const handleValueChange = (key: keyof GoodItemCell, value: any) => {};

  return (
    <CellGroup
      card
      key={props.index}
      header={
        <ReminderAddCellHeader
          index={props.index}
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
        onValueChange={value => handleValueChange('productionDate', value)}
      />
      <NumberInput
        inline
        label="保质期 (天)"
        min={0}
        value={calculateDays(props.item.productionDate, props.item.expireDate)}
        onValueChange={value => handleValueChange('lifePeriod', value)}
      />
      <DatetimePicker
        inline
        label="有效期至"
        value={props.item.expireDate}
        onValueChange={value => handleValueChange('expireDate', value)}
      />
    </CellGroup>
  );
};
