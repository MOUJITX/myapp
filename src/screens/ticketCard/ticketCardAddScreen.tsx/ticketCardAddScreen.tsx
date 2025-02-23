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
import { useTicketCardAddHook } from './ticketCardAddHook';
import {
  TrainTicketCardCarNumber,
  TrainTicketCardInfos,
  TrainTicketCardSeatType,
  TrainTicketCardTips,
} from './types';

export const TicketCardAddScreen = () => {
  const {
    input: { quickSelectStations, quickSelectChecks, quickSelectPassengers },
    output: {
      quickSelectItemAdd,
      quickSelectItemRemove,
      quickSelectItemUpdate,
    },
  } = useTicketCardAddHook();

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
      {/* <CellGroup card>
        <SelectList
          inline
          label="选择列表"
          onValueChange={value => console.log('selected', value)}
          // value="option2"
          selectList={quickSelectStations}
          onItemAdd={item => console.log('add item', item)}
          onItemUpdate={item => console.log('update item', item)}
          onItemRemove={value => console.log('delete item', value)}
          editable
          customFormSetting={{
            fields: [
              { label: '姓名', key: 'name', type: 'text', inline: true },
              { label: '身份证号', key: 'idCard', type: 'text', inline: true },
              { label: '保存', key: 'save', type: 'switch', inline: true },
            ],
            label: '$name($idCard)',
          }}
        />
      </CellGroup> */}
      <CellGroup card title="基础">
        <SelectList
          inline
          label="出发站"
          right={() => renderText('站')}
          onValueChange={value => handleValueChange('startStation', value)}
          // value={trainTicket.startStation.uuid}
          selectList={quickSelectStations}
          onItemAdd={item => quickSelectItemAdd('stations', item)}
          onItemUpdate={item => quickSelectItemUpdate('stations', item)}
          onItemRemove={value => quickSelectItemRemove('stations', value)}
          editable
          customFormSetting={{
            fields: [
              { label: '站名', key: 'name', type: 'text' },
              { label: '拼写', key: 'code', type: 'text' },
            ],
            label: '$name($code)',
          }}
        />
        <SelectList
          inline
          label="到达站"
          right={() => renderText('站')}
          onValueChange={value => handleValueChange('endStation', value)}
          // value={trainTicket.endStation.uuid}
          selectList={quickSelectStations}
          onItemAdd={item => quickSelectItemAdd('stations', item)}
          onItemUpdate={item => quickSelectItemUpdate('stations', item)}
          onItemRemove={value => quickSelectItemRemove('stations', value)}
          editable
          customFormSetting={{
            fields: [
              { label: '站名', key: 'name', type: 'text' },
              { label: '拼写', key: 'code', type: 'text' },
            ],
            label: '$name($code)',
          }}
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
          left={() => renderText('￥')}
          right={() => renderText('元')}
        />
        <SelectList
          inline
          label="检票"
          onValueChange={value => handleValueChange('checking', value)}
          // value={trainTicket.checking}
          selectList={quickSelectChecks}
          onItemAdd={item => quickSelectItemAdd('checks', item)}
          onItemUpdate={item => quickSelectItemUpdate('checks', item)}
          onItemRemove={value => quickSelectItemRemove('checks', value)}
          editable
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
        <SelectList
          inline
          label="席别"
          onValueChange={value => handleValueChange('seat', value)}
          // value={trainTicket.seat.seatType}
          selectList={TrainTicketCardSeatType}
        />
        <SelectList
          inline
          label="车厢号"
          onValueChange={value => handleValueChange('seat', value)}
          // value={trainTicket.seat.carNumber}
          selectList={TrainTicketCardCarNumber}
        />
        <TextInput
          inline
          label="座位号"
          onValueChange={value => handleValueChange('seat', value)}
        />
      </CellGroup>

      <CellGroup card title="乘客信息">
        <SelectList
          inline
          label="乘客信息"
          onValueChange={value => handleValueChange('passenger', value)}
          // value={trainTicket.passenger.name}
          selectList={quickSelectPassengers}
          onItemAdd={item => quickSelectItemAdd('passengers', item)}
          onItemUpdate={item => quickSelectItemUpdate('passengers', item)}
          onItemRemove={value => quickSelectItemRemove('passengers', value)}
          editable
          customFormSetting={{
            fields: [
              { label: '姓名', key: 'name', type: 'text' },
              { label: '身份证', key: 'idCard', type: 'text' },
            ],
            label: '$name($idCard)',
          }}
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
          textLines={4}
          editable={false}
        />
        <SelectList
          label="框上文字"
          onValueChange={value => handleValueChange('cardInfo', value)}
          // value={trainTicket.cardInfo}
          selectList={TrainTicketCardInfos}
        />
        <SelectList
          label="框内文字"
          onValueChange={value => handleValueChange('cardTip', value)}
          // value={trainTicket.cardTip}
          selectList={TrainTicketCardTips}
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
