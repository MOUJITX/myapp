import React, { RefObject, useState } from 'react';
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
  carsSkipSeatNumber,
  carsSkipSeatType,
  seatsBed,
  TrainTicketCardCarNumber,
  TrainTicketCardInfos,
  TrainTicketCardSeatType,
  TrainTicketCardTips,
} from './types';
import { randomUUID } from '../../../utils/utils';
import { BottomSheetRef } from '../../../components/basic/BottomSheet';
import TextInputCustom from '../../../components/basic/TextInputCustom';
import SelectButtons from '../../../components/basic/SelectButtons';

interface Props {
  bottomSheetRef: RefObject<BottomSheetRef>;
  ticket?: TrainTicket;
}

export const TicketCardAddScreen = (props: Props) => {
  const {
    input: {
      quickSelectStations,
      quickSelectChecks,
      quickSelectPassengers,
      createUser,
    },
    output: {
      quickSelectItemAdd,
      quickSelectItemRemove,
      quickSelectItemUpdate,
      trainTicketSubmit,
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
    uuid: randomUUID(),
    startStation: {
      uuid: '',
      name: '',
      code: '',
    },
    endStation: {
      uuid: '',
      name: '',
      code: '',
    },
    trainNumber: '',
    dateTime: new Date(),
    seat: {
      carNumber: '',
      seatNumber: '',
      seatType: '',
    },
    trainPay: 0,
    mark: [],
    passenger: {
      uuid: '',
      idCard: '',
      name: '',
    },
    checking: '',
    ticketRedNumber: '',
    ticketBlackNumber: '',
    qrCode: '',
    cardInfo: '',
    cardTip: '',
    createTime: new Date(),
    createUser,
  };

  const [trainTicket, setTrainTicket] = useState<TrainTicket>(
    props.ticket ?? initTrainTicket
  );

  const handleValueChange = (key: keyof TrainTicket, value: any) => {
    // console.log('key:', key, '; value:', value);
    if (key === 'startStation' || key === 'endStation') {
      const newTrainTicket = {
        ...trainTicket,
        [key]: {
          uuid: value.value,
          name: value.valueData.name,
          code: value.valueData.code,
        },
      };
      setTrainTicket(newTrainTicket);
      return;
    }

    const newTrainTicket = { ...trainTicket, [key]: value };
    setTrainTicket(newTrainTicket);
    return;
  };

  const setMark = (mark: TrainMark, value: boolean): TrainMark[] => {
    const marks = trainTicket.mark.filter(m => m !== mark);
    if (value) {
      marks.push(mark);
    }
    return marks;
  };

  return (
    <SpacingView>
      <TicketCard ticket={trainTicket} />
      <CellGroup card title="基础">
        <SelectList
          inline
          label="出发站"
          right={() => renderText('站')}
          onItemChange={item => handleValueChange('startStation', item)}
          value={trainTicket.startStation.uuid}
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
          onItemChange={item => handleValueChange('endStation', item)}
          value={trainTicket.endStation.uuid}
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
          value={trainTicket.dateTime}
          onValueChange={value => handleValueChange('dateTime', value)}
        />
        <DatetimePicker
          inline
          label="出发时间"
          mode="time"
          value={trainTicket.dateTime}
          onValueChange={value => handleValueChange('dateTime', value)}
        />
        <TextInputCustom
          inline
          label="车次"
          value={trainTicket.trainNumber}
          onValueChange={value => handleValueChange('trainNumber', value)}
          keyboardType="trainNumber"
        />
        <TextInputCustom
          inline
          label="票价"
          keyboardType="decimal"
          value={trainTicket.trainPay.toString()}
          onValueChange={value => handleValueChange('trainPay', value)}
          left={() => renderText('￥')}
          right={() => renderText('元')}
        />
        <SelectList
          inline
          label="检票"
          onValueChange={value => handleValueChange('checking', value)}
          valueIsLabel
          value={trainTicket.checking}
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
          value={trainTicket.mark.includes(TrainMark.Online)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Online, value))
          }
        />
        <Switch
          inline
          label="学生"
          value={trainTicket.mark.includes(TrainMark.Student)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Student, value))
          }
        />
        <Switch
          inline
          label="优惠"
          value={trainTicket.mark.includes(TrainMark.Discount)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Discount, value))
          }
        />

        <Switch
          inline
          label="折扣"
          value={trainTicket.mark.includes(TrainMark.Disc)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Disc, value))
          }
        />
        <Switch
          inline
          label="现金"
          value={trainTicket.mark.includes(TrainMark.Cash)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Cash, value))
          }
        />
        <Switch
          inline
          label="孩童"
          value={trainTicket.mark.includes(TrainMark.Child)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Child, value))
          }
        />
        <Switch
          inline
          label="微信支付"
          value={trainTicket.mark.includes(TrainMark.WeChat)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.WeChat, value))
          }
        />
        <Switch
          inline
          label="支付宝"
          value={trainTicket.mark.includes(TrainMark.Alipay)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Alipay, value))
          }
        />
      </CellGroup>

      <CellGroup card title="座位">
        {!carsSkipSeatType.includes(trainTicket.seat.carNumber) && (
          <SelectList
            inline
            label="席别"
            valueIsLabel
            onValueChange={value =>
              handleValueChange('seat', {
                ...trainTicket.seat,
                seatType: value,
              })
            }
            value={trainTicket.seat.seatType}
            selectList={TrainTicketCardSeatType}
          />
        )}
        <SelectList
          inline
          label="车厢号"
          valueIsLabel
          onValueChange={value =>
            handleValueChange('seat', {
              ...trainTicket.seat,
              carNumber: value,
              ...(carsSkipSeatNumber.includes(value) && { seatNumber: '' }),
              ...(carsSkipSeatType.includes(value) && { seatType: '' }),
            })
          }
          value={trainTicket.seat.carNumber}
          selectList={TrainTicketCardCarNumber}
        />
        {!carsSkipSeatNumber.includes(trainTicket.seat.carNumber) && (
          <>
            <TextInputCustom
              inline
              label="座位号"
              value={trainTicket.seat.seatNumber}
              keyboardType="siteNumber"
              onValueChange={value =>
                handleValueChange('seat', {
                  ...trainTicket.seat,
                  seatNumber: value,
                })
              }
            />
            {seatsBed.includes(trainTicket.seat.seatType) && (
              <SelectButtons
                inline
                label="铺位"
                selectItems={['上铺', '中铺', '下铺'].map(item => ({
                  label: item,
                  value: item,
                }))}
                value={trainTicket.seat.seatBed}
                onValueChange={value =>
                  handleValueChange('seat', {
                    ...trainTicket.seat,
                    seatBed: value,
                  })
                }
              />
            )}
          </>
        )}
      </CellGroup>

      <CellGroup card title="乘客信息">
        <SelectList
          inline
          label="乘客信息"
          onItemChange={item =>
            handleValueChange('passenger', {
              uuid: item.value,
              name: item.valueData.name,
              idCard: item.valueData.idCard,
            })
          }
          value={trainTicket.passenger.uuid}
          selectList={quickSelectPassengers}
          onItemAdd={item => quickSelectItemAdd('passengers', item)}
          onItemUpdate={item => quickSelectItemUpdate('passengers', item)}
          onItemRemove={value => quickSelectItemRemove('passengers', value)}
          editable
          customFormSetting={{
            fields: [
              { label: '姓名', key: 'name', type: 'text' },
              { label: '身份证', key: 'idCard', type: 'idCard' },
            ],
            label: '$name($idCard)',
          }}
        />
      </CellGroup>

      <CellGroup card title="更多">
        <SelectButtons
          inline
          label="票纸"
          selectItems={[
            { label: '红票', value: 'red' },
            { label: '蓝票', value: 'blue' },
          ]}
          value={trainTicket.paperType ?? 'blue'}
          onValueChange={value => handleValueChange('paperType', value)}
        />
        <TextInput
          inline
          label="红色编号"
          value={trainTicket.ticketRedNumber}
          autoCapitalize="characters"
          onValueChange={value => handleValueChange('ticketRedNumber', value)}
        />
        <TextInput
          inline
          label="黑色编号"
          value={trainTicket.ticketBlackNumber}
          autoCapitalize="characters"
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
          value={trainTicket.cardInfo}
          selectList={TrainTicketCardInfos}
        />
        <SelectList
          label="框内文字"
          onValueChange={value => handleValueChange('cardTip', value)}
          value={trainTicket.cardTip}
          selectList={TrainTicketCardTips}
        />
      </CellGroup>
      <Button
        label="保存"
        type="primary"
        onPress={() => {
          trainTicketSubmit(trainTicket);
          props.bottomSheetRef.current?.closeBottomSheet();
        }}
      />
    </SpacingView>
  );
};
