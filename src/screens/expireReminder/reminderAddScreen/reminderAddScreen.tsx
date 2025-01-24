import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import CellGroup from '../../../components/basic/CellGroup';
import TextInput from '../../../components/basic/TextInput';
import TextLabel from '../../../components/basic/TextLabel';
import Button from '../../../components/basic/Button';
import NumberInput from '../../../components/basic/NumberInput';
import SpacingView from '../../../components/basic/SpacingView';
import ImageRow from '../../../components/basic/ImageRow';
import { GoodItem } from '../../../store/expireReminder/expireReminder.type';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import { randomUUID } from '../../../utils/utils';

export const ExpireReminderAddScreen = () => {
  const [title, setTitle] = useState<string>();
  const [imgs, setImgs] = useState<string[]>([]);
  const [uniCode, setUniCode] = useState<string>();
  const [number, setNumber] = useState<number>(1);
  const [items, setItems] = useState<GoodItem[]>([]);

  // useEffect(() => {
  //   setItems([
  //     ...items,
  //     {
  //       itemID: randomUUID(),
  //       expireDate: new Date(),
  //       createTime: new Date(),
  //     },
  //   ]);
  // }, [items, number]);

  return (
    <SpacingView>
      <Text>ExpireReminderAddScreen</Text>
      <View>
        <CellGroup card>
          <TextInput
            inline
            value={title}
            onValueChange={value => setTitle(value)}
          />
          <ImageRow
            imgs={imgs}
            size={'large'}
            radius
            onValueChange={value => setImgs(value)}
          />
          <TextInput
            inline
            label="商品条码"
            type="number"
            value={uniCode}
            onValueChange={value => setUniCode(value)}
          />
          <NumberInput
            inline
            label="数量"
            step={1}
            min={0}
            max={50}
            value={number}
            onValueChange={value => setNumber(value ?? 0)}
          />
        </CellGroup>
        {items.map((item, index) => (
          <CellGroup card key={index}>
            <TextLabel inline label={`# ${index}`} labelSize="h2" />
            <DatetimePicker inline label="生产日期" onValueChange={() => {}} />
            <TextInput inline label="保质期" onValueChange={() => {}} />
            <DatetimePicker
              inline
              label="有效期至"
              value={item.expireDate}
              onValueChange={() => {}}
            />
          </CellGroup>
        ))}
        <Button type="primary" label="保存" />
      </View>
    </SpacingView>
  );
};
