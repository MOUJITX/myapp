import React from 'react';
import { Text, View } from 'react-native';
import CellGroup from '../../../components/basic/CellGroup';
import TextInput from '../../../components/basic/TextInput';
import TextLabel from '../../../components/basic/TextLabel';
import Button from '../../../components/basic/Button';
import NumberInput from '../../../components/basic/NumberInput';
import SpacingView from '../../../components/basic/SpacingView';
import ImageRow from '../../../components/basic/ImageRow';

export const ExpireReminderAddScreen = () => {
  return (
    <SpacingView>
      <Text>ExpireReminderAddScreen</Text>
      <View>
        <CellGroup card>
          <TextInput inline onValueChange={() => {}} />
          <ImageRow
            imgs={[
              'https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128',
              'https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128',
            ]}
            size={'large'}
            radius
          />
          <TextInput
            inline
            label="商品条码"
            type="number"
            onValueChange={() => {}}
          />
          <NumberInput
            inline
            label="数量"
            step={1}
            min={-10}
            max={50}
            onValueChange={() => {}}
          />
        </CellGroup>
        <CellGroup card>
          <TextLabel inline label="# 1" labelSize="h2" />
          <TextInput inline label="生产日期" onValueChange={() => {}} />
          <TextInput inline label="保质期" onValueChange={() => {}} />
          <TextInput inline label="有效期至" onValueChange={() => {}} />
        </CellGroup>
        <CellGroup card>
          <TextLabel inline label="# 2" labelSize="h2" />
          <TextInput inline label="生产日期" onValueChange={() => {}} />
          <TextInput inline label="保质期" onValueChange={() => {}} />
          <TextInput inline label="有效期至" onValueChange={() => {}} />
        </CellGroup>
        <CellGroup card>
          <TextLabel inline label="# 3" labelSize="h2" />
          <TextInput inline label="生产日期" onValueChange={() => {}} />
          <TextInput inline label="保质期" onValueChange={() => {}} />
          <TextInput inline label="有效期至" onValueChange={() => {}} />
        </CellGroup>
        <Button type="primary" label="保存" />
      </View>
    </SpacingView>
  );
};
