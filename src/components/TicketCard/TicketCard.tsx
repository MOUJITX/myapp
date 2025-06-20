import { useState } from 'react';
import {
  ImageBackground,
  LayoutChangeEvent,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  View,
} from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import {
  TrainPassengerInfo,
  TrainTicket,
} from '../../store/ticketCard/ticketCard.type';
import { commonStyles } from '../../styles';
import { autoFontSize } from '../../utils/autoSize';
import { formatDate } from '../../utils/datetime';
import { stringFormat } from '../../utils/utils';

interface Props {
  ticket: TrainTicket;
}

const TextSingleLine = ({
  label,
  style,
}: {
  label?: string | number;
  style?: StyleProp<TextStyle>;
}) => (
  <Text numberOfLines={1} ellipsizeMode="clip" style={style}>
    {label}
  </Text>
);

const TextDoubleLines = ({
  label,
  style,
}: {
  label?: string;
  style?: StyleProp<TextStyle>;
}) =>
  label && (
    <>
      <Text numberOfLines={1} ellipsizeMode="clip" style={style}>
        {label.split(',')[0]}
      </Text>

      <Text numberOfLines={1} ellipsizeMode="clip" style={style}>
        {label.split(',')[1]}
      </Text>
    </>
  );

const formatPassengerInfo = (info: TrainPassengerInfo) => {
  const formatString = `${info.idCard.slice(0, 10) + '****' + info.idCard.slice(14, 18)} ${info.name}`;
  return stringFormat(formatString, 'upAll');
};

export default (props: Props) => {
  const [baseWidth, setBaseWidth] = useState<number>(300);
  const cardRatio = 800 / 534;
  // const cardRatio = props.ticket.paperType === 'red' ? 800 / 534 : 2126 / 1559;

  const onLayout = (event: LayoutChangeEvent) => {
    setBaseWidth(event.nativeEvent.layout.width);
  };

  return (
    <ImageBackground
      source={
        props.ticket.paperType === 'red'
          ? require('../../assets/img/redTicket.webp')
          : require('../../assets/img/blueTicket.webp')
      }
      style={styles(baseWidth, cardRatio).container}
      resizeMode="cover">
      <View style={styles(baseWidth).cardInfo} onLayout={onLayout}>
        <View
          style={[styles(baseWidth).areaCommon, styles(baseWidth).headArea]}>
          <TextSingleLine
            label={stringFormat(props.ticket.ticketRedNumber, 'upAll')}
            style={styles(baseWidth).cardNumber}
          />
          <TextSingleLine
            label={props.ticket.checking}
            style={styles(baseWidth).checkWindow}
          />
        </View>
        <View
          style={[styles(baseWidth).areaCommon, styles(baseWidth).stationArea]}>
          <View style={styles(baseWidth).stationStart}>
            <TextSingleLine
              label={props.ticket.startStation.name}
              style={styles(baseWidth).stationCN}
            />
          </View>
          <TextSingleLine
            label={stringFormat(props.ticket.trainNumber, 'upAll')}
            style={styles(baseWidth).trainNumber}
          />
          <View style={styles(baseWidth).stationEnd}>
            <TextSingleLine
              label={props.ticket.endStation.name}
              style={styles(baseWidth).stationCN}
            />
          </View>
        </View>
        <View
          style={[
            styles(baseWidth).areaCommon,
            styles(baseWidth).stationENArea,
          ]}>
          <TextSingleLine
            label={stringFormat(props.ticket.startStation.code, 'upFirstOnly')}
            style={styles(baseWidth).stationEN}
          />
          <TextSingleLine
            label={stringFormat(props.ticket.endStation.code, 'upFirstOnly')}
            style={styles(baseWidth).stationEN}
          />
        </View>
        <View
          style={[
            styles(baseWidth).areaCommon,
            styles(baseWidth).trainDateArea,
          ]}>
          <View
            style={[
              styles(baseWidth).areaCommon,
              styles(baseWidth).trainDateTime,
            ]}>
            <TextSingleLine
              label={formatDate(props.ticket.dateTime, 'year')}
              style={styles(baseWidth).trainDateText}
            />
            <TextSingleLine
              label={formatDate(props.ticket.dateTime, 'month')}
              style={styles(baseWidth).trainDateText}
            />
            <TextSingleLine
              label={formatDate(props.ticket.dateTime, 'day')}
              style={styles(baseWidth).trainDateText}
            />
            <TextSingleLine
              label={formatDate(props.ticket.dateTime, 'hh:mm')}
              style={styles(baseWidth).trainDateText}
            />
          </View>
          <View
            style={[
              styles(baseWidth).areaCommon,
              styles(baseWidth).trainSeatNumber,
            ]}>
            <TextSingleLine
              label={props.ticket.seat.carNumber}
              style={styles(baseWidth).trainDateText}
            />
            <TextSingleLine
              label={stringFormat(props.ticket.seat.seatNumber, 'upAll')}
              style={styles(baseWidth).trainDateText}
            />
            <TextSingleLine
              label={props.ticket.seat.seatBed}
              style={styles(baseWidth).trainDateText}
            />
          </View>
        </View>
        <View
          style={[
            styles(baseWidth).areaCommon,
            styles(baseWidth).trainPayArea,
          ]}>
          <TextSingleLine
            label={props.ticket.trainPay}
            style={styles(baseWidth).trainPay}
          />
          <View style={styles(baseWidth).trainMark}>
            {props.ticket.mark.map((mark, index) => (
              <View style={styles(baseWidth).markCircle} key={index}>
                <TextSingleLine
                  label={mark}
                  style={styles(baseWidth).trainMarkText}
                />
              </View>
            ))}
          </View>
          <TextSingleLine
            label={props.ticket.seat.seatType}
            style={styles(baseWidth).trainSeatType}
          />
        </View>
        <View style={styles(baseWidth).trainInfoArea}>
          <TextDoubleLines
            label={props.ticket.cardInfo}
            style={styles(baseWidth).trainInfoText}
          />
        </View>
        <TextSingleLine
          label={formatPassengerInfo(props.ticket.passenger)}
          style={styles(baseWidth).passengerArea}
        />
        <View style={styles(baseWidth).cardTipArea}>
          <TextDoubleLines
            label={props.ticket.cardTip}
            style={styles(baseWidth).cardTipText}
          />
        </View>
        <View style={styles(baseWidth).QRcodeArea}>
          <QRCode
            value={
              props.ticket.qrCode === undefined || props.ticket.qrCode === ''
                ? '12306'
                : props.ticket.qrCode
            }
            backgroundColor="rgba(0,0,0,0)"
            size={autoFontSize(65, baseWidth)}
          />
        </View>
        <TextSingleLine
          label={stringFormat(props.ticket.ticketBlackNumber, 'upAll')}
          style={styles(baseWidth).cardCodeArea}
        />
      </View>
    </ImageBackground>
  );
};

const styles = (baseWidth: number, cardRatio?: number) =>
  StyleSheet.create({
    QRcodeArea: {
      left: '79%',
      position: 'absolute',
      top: '61%',
    },
    areaCommon: {
      flexDirection: 'row',
    },
    cardCodeArea: {
      fontSize: autoFontSize(16, baseWidth),
      top: '5.5%',
    },

    cardInfo: {
      height: '100%',
      width: '90%',
    },
    cardNumber: {
      color: 'red',
      fontSize: autoFontSize(22, baseWidth),
      left: '2%',
    },
    cardTipArea: {
      alignItems: 'center',
      borderStyle: 'dashed',
      borderWidth: 1,
      height: '14%',
      justifyContent: 'center',
      left: '5%',
      width: '64%',
    },

    cardTipText: {
      fontSize: autoFontSize(15, baseWidth),
    },
    checkWindow: {
      fontSize: autoFontSize(19, baseWidth),
    },
    container: {
      alignItems: 'center',
      aspectRatio: cardRatio,
      backgroundColor: 'white',
      borderRadius: autoFontSize(12),
      overflow: 'hidden',
      width: '100%',
      ...commonStyles.shadow,
    },
    headArea: {
      alignItems: 'center',
      justifyContent: 'space-between',
      top: '3%',
    },
    markCircle: {
      alignItems: 'center',
      borderRadius: 50,
      borderWidth: 1,
      height: autoFontSize(20, baseWidth),
      justifyContent: 'center',
      overflow: 'hidden',
      width: autoFontSize(20, baseWidth),
    },

    passengerArea: {
      fontSize: autoFontSize(20, baseWidth),
    },
    stationArea: {
      height: '13%',
      justifyContent: 'space-between',
      top: '2%',
    },

    stationCN: {
      fontSize: autoFontSize(29, baseWidth),
      textAlign: 'center',
    },
    stationEN: {
      fontSize: autoFontSize(17, baseWidth),
      textAlign: 'center',
      width: '40%',
    },
    stationENArea: {
      justifyContent: 'space-between',
    },
    stationEnd: {
      width: '40%',
    },

    stationStart: {
      width: '40%',
    },
    trainDateArea: {
      justifyContent: 'space-between',
      top: '-1%',
    },
    trainDateText: {
      fontSize: autoFontSize(18, baseWidth),
    },
    trainDateTime: {
      gap: '9.5%',
    },
    trainInfoArea: {
      height: '17%',
    },
    trainInfoText: {
      fontSize: autoFontSize(17, baseWidth),
    },

    trainMark: {
      flexDirection: 'row',
      gap: '3%',
      left: '40.5%',
      position: 'absolute',
    },
    trainMarkText: {
      fontSize: autoFontSize(16, baseWidth),
    },

    trainNumber: {
      fontSize: autoFontSize(26, baseWidth),
      left: '38%',
      position: 'absolute',
      textAlign: 'center',
      top: '9%',
      width: '25%',
    },

    trainPay: {
      fontSize: autoFontSize(19, baseWidth),
      left: '4%',
    },
    trainPayArea: {
      height: '7%',
      top: '-1%',
    },

    trainSeatNumber: {
      gap: '12%',
      width: '32%',
    },

    trainSeatType: {
      fontSize: autoFontSize(17, baseWidth),
      left: '79%',
      position: 'absolute',
    },
  });
