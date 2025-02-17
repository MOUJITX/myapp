import React from 'react';
import CellGroup from '../../../components/basic/CellGroup';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import ReminderAddCellHeader from './reminderAddCellHeader';
import { GoodItem } from '../../../store/expireReminder/expireReminder.type';
import NumberInput from '../../../components/basic/NumberInput';
import { calculateDays } from '../../../utils/datetime';
import { t } from 'i18next';
import Switch from '../../../components/basic/Switch';

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
        lifeDays: calculateDays(value, newGoodItemCell.expireDate, true),
      };
    }

    if (key === 'lifeDays') {
      const newDate = new Date(newGoodItemCell.productionDate ?? new Date());
      newDate.setDate(newDate.getDate() + value);
      newGoodItemCell = {
        ...newGoodItemCell,
        lifeDays: value,
        expireDate: newDate,
      };
    }

    if (key === 'expireDate') {
      newGoodItemCell = {
        ...newGoodItemCell,
        expireDate: value,
        lifeDays: calculateDays(value, newGoodItemCell.productionDate, true),
      };
    }

    if (key === 'isUsed') {
      console.log(value);
      newGoodItemCell = {
        ...newGoodItemCell,
        isUsed: !value,
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
        label={t('expireReminder.add.productionDate.label')}
        value={props.item.productionDate}
        maxDate={props.item.expireDate}
        onValueChange={value => handleValueChange('productionDate', value)}
      />
      <NumberInput
        inline
        label={t('expireReminder.add.lifeDays.label')}
        min={0}
        value={props.item.lifeDays}
        quickValues={[
          { label: t('expireReminder.add.lifeDays.oneYear'), value: 365 },
          { label: t('expireReminder.add.lifeDays.twoYear'), value: 730 },
          { label: t('expireReminder.add.lifeDays.threeYear'), value: 1095 },
        ]}
        onValueChange={value => handleValueChange('lifeDays', value)}
      />
      <DatetimePicker
        inline
        label={t('expireReminder.add.expireDate.label')}
        value={props.item.expireDate}
        minDate={props.item.productionDate}
        onValueChange={value => handleValueChange('expireDate', value)}
      />
      <Switch
        inline
        label={t('expireReminder.add.used.label')}
        value={!props.item.isUsed}
        onValueChange={value => handleValueChange('isUsed', value)}
      />
    </CellGroup>
  );
};
