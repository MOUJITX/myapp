import { useNavigation, useRoute } from '@react-navigation/native';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { Text } from 'react-native';

import Button from '../../../components/basic/Button';
import Cell from '../../../components/basic/Cell';
import CellGroup from '../../../components/basic/CellGroup';
import DatetimePicker from '../../../components/basic/DatetimePicker';
import ImageRow from '../../../components/basic/ImageRow';
import ScanCameraButton from '../../../components/basic/ScanCameraButton';
import SelectButtons from '../../../components/basic/SelectButtons';
import SelectList from '../../../components/basic/SelectList';
import SpacingView from '../../../components/basic/SpacingView';
import Switch from '../../../components/basic/Switch';
import TextInput from '../../../components/basic/TextInput';
import TextInputCustom from '../../../components/basic/TextInputCustom';
import TicketCard from '../../../components/TicketCard/TicketCard';
import { RouteProp } from '../../../navigation/AppNavigationList';
import {
  TrainMark,
  TrainTicket,
} from '../../../store/ticketCard/ticketCard.type';
import { randomUUID } from '../../../utils/utils';

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

export interface TicketCardAddScreenProps {
  ticket?: TrainTicket;
}

export const TicketCardAddScreen = () => {
  const { ticket }: TicketCardAddScreenProps =
    useRoute<RouteProp<'TicketCardAddScreen'>>().params;

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
    ticket ?? initTrainTicket,
  );

  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          label={t('common.save.label')}
          type="primary"
          text
          onPress={() => trainTicketSubmit(trainTicket)}
        />
      ),
    });
  }, [navigation, trainTicket, trainTicketSubmit]);

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
      <CellGroup card title={t('trainTicket.add.section.basic')}>
        <SelectList
          inline
          label={t('trainTicket.add.station.startStation')}
          right={() => renderText(t('trainTicket.add.station.suffix'))}
          onItemChange={item => handleValueChange('startStation', item)}
          value={trainTicket.startStation.uuid}
          selectList={quickSelectStations}
          onItemAdd={item => quickSelectItemAdd('stations', item)}
          onItemUpdate={item => quickSelectItemUpdate('stations', item)}
          onItemRemove={value => quickSelectItemRemove('stations', value)}
          editable
          customFormSetting={{
            fields: [
              {
                label: t('trainTicket.add.station.name'),
                key: 'name',
                type: 'text',
              },
              {
                label: t('trainTicket.add.station.code'),
                key: 'code',
                type: 'text',
              },
            ],
            label: t('trainTicket.add.station.display'),
          }}
        />
        <SelectList
          inline
          label={t('trainTicket.add.station.arriveStation')}
          right={() => renderText(t('trainTicket.add.station.suffix'))}
          onItemChange={item => handleValueChange('endStation', item)}
          value={trainTicket.endStation.uuid}
          selectList={quickSelectStations}
          onItemAdd={item => quickSelectItemAdd('stations', item)}
          onItemUpdate={item => quickSelectItemUpdate('stations', item)}
          onItemRemove={value => quickSelectItemRemove('stations', value)}
          editable
          customFormSetting={{
            fields: [
              {
                label: t('trainTicket.add.station.name'),
                key: 'name',
                type: 'text',
              },
              {
                label: t('trainTicket.add.station.code'),
                key: 'code',
                type: 'text',
              },
            ],
            label: t('trainTicket.add.station.display'),
          }}
        />
        <DatetimePicker
          inline
          label={t('trainTicket.add.dateTime.start')}
          value={trainTicket.dateTime}
          onValueChange={value => handleValueChange('dateTime', value)}
        />
        <DatetimePicker
          inline
          label={t('trainTicket.add.dateTime.arrive')}
          mode="time"
          value={trainTicket.dateTime}
          onValueChange={value => handleValueChange('dateTime', value)}
        />
        <TextInputCustom
          inline
          label={t('trainTicket.add.train.number')}
          value={trainTicket.trainNumber}
          onValueChange={value => handleValueChange('trainNumber', value)}
          keyboardType="trainNumber"
        />
        <TextInputCustom
          inline
          label={t('trainTicket.add.train.fare.label')}
          keyboardType="decimal"
          value={trainTicket.trainPay.toString()}
          onValueChange={value => handleValueChange('trainPay', value)}
          left={() => renderText(t('trainTicket.add.train.fare.unit.CNY.code'))}
          right={() =>
            renderText(t('trainTicket.add.train.fare.unit.CNY.name'))
          }
        />
        <SelectList
          inline
          label={t('trainTicket.add.checkIn')}
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

      <CellGroup card title={t('trainTicket.add.mark.title')}>
        <Switch
          inline
          label={t('trainTicket.add.mark.online')}
          value={trainTicket.mark.includes(TrainMark.Online)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Online, value))
          }
        />
        <Switch
          inline
          label={t('trainTicket.add.mark.student')}
          value={trainTicket.mark.includes(TrainMark.Student)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Student, value))
          }
        />
        <Switch
          inline
          label={t('trainTicket.add.mark.discount')}
          value={trainTicket.mark.includes(TrainMark.Discount)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Discount, value))
          }
        />

        <Switch
          inline
          label={t('trainTicket.add.mark.disc')}
          value={trainTicket.mark.includes(TrainMark.Disc)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Disc, value))
          }
        />
        <Switch
          inline
          label={t('trainTicket.add.mark.cash')}
          value={trainTicket.mark.includes(TrainMark.Cash)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Cash, value))
          }
        />
        <Switch
          inline
          label={t('trainTicket.add.mark.child')}
          value={trainTicket.mark.includes(TrainMark.Child)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Child, value))
          }
        />
        <Switch
          inline
          label={t('trainTicket.add.mark.weChat')}
          value={trainTicket.mark.includes(TrainMark.WeChat)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.WeChat, value))
          }
        />
        <Switch
          inline
          label={t('trainTicket.add.mark.alipay')}
          value={trainTicket.mark.includes(TrainMark.Alipay)}
          onValueChange={value =>
            handleValueChange('mark', setMark(TrainMark.Alipay, value))
          }
        />
      </CellGroup>

      <CellGroup card title={t('trainTicket.add.section.seat')}>
        {!carsSkipSeatType.includes(trainTicket.seat.carNumber) && (
          <SelectList
            inline
            label={t('trainTicket.add.train.seatType')}
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
          label={t('trainTicket.add.train.car')}
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
              label={t('trainTicket.add.train.seat')}
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
                label={t('trainTicket.add.train.seatBed.title')}
                selectItems={[
                  t('trainTicket.add.train.seatBed.upper'),
                  t('trainTicket.add.train.seatBed.middle'),
                  t('trainTicket.add.train.seatBed.lower'),
                ].map((item, index) => ({
                  label: item,
                  value: ['上铺', '中铺', '下铺'][index],
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

      <CellGroup card title={t('trainTicket.add.section.passenger')}>
        <SelectList
          inline
          label={t('trainTicket.add.passenger.title')}
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
              {
                label: t('trainTicket.add.passenger.name'),
                key: 'name',
                type: 'text',
              },
              {
                label: t('trainTicket.add.passenger.idCard'),
                key: 'idCard',
                type: 'idCard',
              },
            ],
            label: '$name($idCard)',
          }}
        />
      </CellGroup>

      <CellGroup card title={t('trainTicket.add.section.more')}>
        <SelectButtons
          inline
          label={t('trainTicket.add.paper.type.name')}
          selectItems={[
            { label: t('trainTicket.add.paper.type.red'), value: 'red' },
            { label: t('trainTicket.add.paper.type.blue'), value: 'blue' },
          ]}
          value={trainTicket.paperType ?? 'blue'}
          onValueChange={value => handleValueChange('paperType', value)}
        />
        <TextInput
          inline
          label={t('trainTicket.add.paper.redNumber')}
          value={trainTicket.ticketRedNumber}
          autoCapitalize="characters"
          onValueChange={value => handleValueChange('ticketRedNumber', value)}
        />
        <TextInput
          inline
          label={t('trainTicket.add.paper.blackNumber')}
          value={trainTicket.ticketBlackNumber}
          autoCapitalize="characters"
          onValueChange={value => handleValueChange('ticketBlackNumber', value)}
        />
        <TextInput
          label={t('trainTicket.add.paper.qrCode')}
          value={trainTicket.qrCode}
          left={renderCameraScanButton}
          onValueChange={value => handleValueChange('qrCode', value)}
          textLines={4}
          editable={false}
        />
        <SelectList
          label={t('trainTicket.add.paper.cardInfo')}
          onValueChange={value => handleValueChange('cardInfo', value)}
          value={trainTicket.cardInfo}
          selectList={TrainTicketCardInfos}
        />
        <SelectList
          label={t('trainTicket.add.paper.cardTip')}
          onValueChange={value => handleValueChange('cardTip', value)}
          value={trainTicket.cardTip}
          selectList={TrainTicketCardTips}
        />
        <Cell label={t('trainTicket.add.paper.image')}>
          <ImageRow
            imgs={trainTicket.images ?? []}
            size={'large'}
            radius
            upload
            onValueChange={value => handleValueChange('images', value)}
            folder={'trainTickets'}
          />
        </Cell>
      </CellGroup>
    </SpacingView>
  );
};
