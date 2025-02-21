import React, { useState } from 'react';
import CellGroup from '../../../components/basic/CellGroup';
import SpacingView from '../../../components/basic/SpacingView';
import TextInput from '../../../components/basic/TextInput';
import TicketCard from '../../../components/TicketCard/TicketCard';
import { Text } from 'react-native';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import Switch from '../../../components/basic/Switch';
import Button from '../../../components/basic/Button';
import ScanCameraButton from '../../../components/basic/ScanCameraButton';
import {
  TrainMark,
  TrainTicket,
} from '../../../store/ticketCard/ticketCard.type';
import SelectList from '../../../components/basic/SelectList';

export const TicketCardAddScreen = () => {
  const renderText = (text: string) => <Text>{text}</Text>;

  const renderCameraScanButton = () => (
    <ScanCameraButton
      codeType={'qr'}
      onSuccess={value => handleValueChange('qrCode', value)}
    />
  );

  const initTrainTicket: TrainTicket = {
    uuid: 'uuid2025',
    startStation: {
      uuid: 'ss',
      name: '杭州东',
      code: 'hangzhoudong',
    },
    endStation: {
      uuid: 'es',
      name: '南京南',
      code: 'nanjingnan',
    },
    trainNumber: 'G1234',
    dateTime: new Date('2024-12-21 11:41:02'),
    seat: {
      carNumber: '05',
      seatNumber: '12F',
      seatType: '二等座',
    },
    trainPay: 12.3,
    mark: [TrainMark.Student, TrainMark.Discount],
    passenger: {
      idCard: '330001200102034321',
      name: '王小明',
    },
    checking: '14A',
    ticketRedNumber: 'E01234567',
    ticketBlackNumber: '33108100200122ED51944289 JM',
    qrCode: '33122324311242414142141421114',
    cardInfo: ',仅供报销使用',
    cardTip: '买票请到12306 发货请到95306,报销凭证 遗失不补',
    createTime: new Date(),
    createUser: 'cu',
  };

  const [trainTicket, setTrainTicket] = useState<TrainTicket>(initTrainTicket);

  const handleValueChange = (key: keyof TrainTicket, value: any) => {
    console.log('key:', key, '; value:', value);
    const newTrainTicket = { ...trainTicket, [key]: value };
    setTrainTicket(newTrainTicket);
  };

  return (
    <SpacingView>
      <TicketCard ticket={initTrainTicket} />
      <CellGroup card>
        <SelectList
          inline
          label="选择列表"
          onValueChange={value => console.log('selected', value)}
          selectList={[
            { label: 'Option 1', value: 'option1', isDefault: true },
            {
              label: 'Option 2',
              value: 'option2',
              valueData: { name: '123', idCard: '456' },
            },
            {
              label: 'Option 3',
              value: 'option3',
              valueData: { name: 'abc', idCard: 'def' },
            },
          ]}
          editable
          editBottomSheet={[
            { label: '姓名', key: 'name', type: 'text' },
            { label: '身份证号', key: 'idCard', type: 'text' },
          ]}
        />
      </CellGroup>
      <CellGroup card title="基础">
        <TextInput
          inline
          label="出发站"
          right={() => renderText('站')}
          onValueChange={value => handleValueChange('startStation', value)}
        />
        <TextInput
          inline
          label="到达站"
          right={() => renderText('站')}
          onValueChange={value => handleValueChange('endStation', value)}
        />
        <DatetimePicker
          inline
          label="出发日期"
          onValueChange={value => handleValueChange('dateTime', value)}
        />
        <DatetimePicker
          inline
          label="出发时间"
          mode="time"
          onValueChange={value => handleValueChange('dateTime', value)}
        />
        <TextInput
          inline
          label="车次"
          onValueChange={value => handleValueChange('trainNumber', value)}
        />
        <TextInput
          inline
          label="票价"
          onValueChange={value => handleValueChange('trainPay', value)}
        />
        <TextInput
          inline
          label="检票"
          onValueChange={value => handleValueChange('checking', value)}
        />
      </CellGroup>

      <CellGroup card title="标识">
        <Switch
          inline
          label="网售"
          onValueChange={value => handleValueChange('mark', value)}
        />
        <Switch
          inline
          label="学生"
          onValueChange={value => handleValueChange('mark', value)}
        />
        <Switch
          inline
          label="优惠"
          onValueChange={value => handleValueChange('mark', value)}
        />
      </CellGroup>

      <CellGroup card title="座位">
        <TextInput
          inline
          label="席别"
          onValueChange={value => handleValueChange('seat', value)}
        />
        <TextInput
          inline
          label="车厢号"
          onValueChange={value => handleValueChange('seat', value)}
        />
        <TextInput
          inline
          label="座位号"
          onValueChange={value => handleValueChange('seat', value)}
        />
      </CellGroup>

      <CellGroup card title="乘客信息">
        <TextInput
          inline
          label="身份证号"
          onValueChange={value => handleValueChange('passenger', value)}
        />
        <TextInput
          inline
          label="姓名"
          onValueChange={value => handleValueChange('passenger', value)}
        />
      </CellGroup>

      <CellGroup card title="更多">
        <TextInput
          inline
          label="红色编号"
          onValueChange={value => handleValueChange('ticketRedNumber', value)}
        />
        <TextInput
          inline
          label="黑色编号"
          onValueChange={value => handleValueChange('ticketBlackNumber', value)}
        />
        <TextInput
          label="二维码信息"
          value={trainTicket.qrCode}
          left={renderCameraScanButton}
          onValueChange={value => handleValueChange('qrCode', value)}
        />
        <TextInput
          label="框上文字"
          onValueChange={value => handleValueChange('cardInfo', value)}
        />
        <TextInput
          label="框内文字"
          onValueChange={value => handleValueChange('cardTip', value)}
        />
      </CellGroup>
      <Button
        label="保存"
        type="primary"
        onPress={() => console.log('trainTicket', trainTicket)}
      />
    </SpacingView>
  );
};
