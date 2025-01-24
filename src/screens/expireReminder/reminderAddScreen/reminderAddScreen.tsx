import React from 'react';
import { Text, View } from 'react-native';
import CellGroup from '../../../components/basic/CellGroup';
import TextInput from '../../../components/basic/TextInput';
import TextLabel from '../../../components/basic/TextLabel';
import Button from '../../../components/basic/Button';
import NumberInput from '../../../components/basic/NumberInput';
import SpacingView from '../../../components/basic/SpacingView';
import ImageRow from '../../../components/basic/ImageRow';
import ImagePicker from '../../../components/basic/ImagePicker';

export const ExpireReminderAddScreen = () => {
  return (
    <SpacingView>
      <Text>ExpireReminderAddScreen</Text>
      <ImagePicker />
      <View>
        <CellGroup card>
          <TextInput inline onValueChange={() => {}} />
          <ImageRow
            imgs={[
              'file:////data/user/0/com.myapp/files/a7b9f1f9-a630-45b7-ebe2-ca87e1c41681',
              'https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128',
              'file:////data/user/0/com.myapp/files/30b3ea60-ba14-4907-c076-c26810ad6a1c',
              'https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128',
              'https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128',
              'https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128',
              'https://moujitx.cn/files/3c02b44a88d947b580103e8cec4495f8.jpg-128',
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
        <Button type="primary" label="保存" />
      </View>
    </SpacingView>
  );
};
