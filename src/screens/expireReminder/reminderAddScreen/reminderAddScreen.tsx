import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import CellGroup from '../../../components/basic/CellGroup';
import TextInput from '../../../components/basic/TextInput';
import TextLabel from '../../../components/basic/TextLabel';
import Button from '../../../components/basic/Button';
import SpacingView from '../../../components/basic/SpacingView';
import ImageRow from '../../../components/basic/ImageRow';
import { GoodItem } from '../../../store/expireReminder/expireReminder.type';
import { randomUUID } from '../../../utils/utils';
import ReminderAddCell from './reminderAddCell';

export const ExpireReminderAddScreen = () => {
  const [title, setTitle] = useState<string>();
  const [imgs, setImgs] = useState<string[]>([]);
  const [uniCode, setUniCode] = useState<string>();
  const [items, setItems] = useState<GoodItem[]>([]);

  useEffect(() => {
    items.length === 0
      ? setItems([
          {
            itemID: randomUUID(),
            createTime: new Date(),
            expireDate: new Date(),
          },
        ])
      : undefined;
  }, [items.length]);

  const handleAdd = (index: number) => {
    console.log('handleAdd', index);
  };

  const handleCopy = (index: number) => {
    console.log('handleCopy', index);
  };

  const handleDelete = (index: number) => {
    console.log('handleCopy', index);
  };

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
          <TextLabel inline label="数量" value={items.length.toString()} />
        </CellGroup>
        {items.map((item, index) => (
          <ReminderAddCell
            item={item}
            onAdd={() => handleAdd(index)}
            onCopy={() => handleCopy(index)}
            onDelete={() => handleDelete(index)}
            onValueChange={value => console.log(value)}
            index={index}
          />
        ))}
        <Button type="primary" label="保存" />
      </View>
    </SpacingView>
  );
};
