import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground, // 新增图片背景组件
  Text,
  StyleProp,
  TextStyle,
  LayoutChangeEvent,
} from 'react-native';
import { autoFontSize } from '../../utils/autoSize';
import QRCode from 'react-native-qrcode-svg';
import {
  TrainPassengerInfo,
  TrainTicket,
} from '../../store/ticketCard/ticketCard.type';
import { formatDate } from '../../utils/datetime';
import { stringFormat } from '../../utils/utils';
import { commonStyles } from '../../styles';

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
      resizeMode="cover"
    >
      <View style={styles(baseWidth).cardInfo} onLayout={onLayout}>
        <View
          style={[styles(baseWidth).areaCommon, styles(baseWidth).headArea]}
        >
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
          style={[styles(baseWidth).areaCommon, styles(baseWidth).stationArea]}
        >
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
          ]}
        >
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
          ]}
        >
          <View
            style={[
              styles(baseWidth).areaCommon,
              styles(baseWidth).trainDateTime,
            ]}
          >
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
            ]}
          >
            <TextSingleLine
              label={props.ticket.seat.carNumber}
              style={styles(baseWidth).trainDateText}
            />
            <TextSingleLine
              label={stringFormat(props.ticket.seat.seatNumber, 'upAll')}
              style={styles(baseWidth).trainDateText}
            />
          </View>
        </View>
        <View
          style={[styles(baseWidth).areaCommon, styles(baseWidth).trainPayArea]}
        >
          <TextSingleLine
            label={props.ticket.trainPay}
            style={[styles(baseWidth).trainPay]}
          />
          <View style={[styles(baseWidth).trainMark]}>
            {props.ticket.mark.map((mark, index) => (
              <View style={styles(baseWidth).markCircle} key={index}>
                <TextSingleLine
                  label={mark}
                  style={[styles(baseWidth).trainMarkText]}
                />
              </View>
            ))}
          </View>
          <TextSingleLine
            label={props.ticket.seat.seatType}
            style={[styles(baseWidth).trainSeatType]}
          />
        </View>
        <View style={[styles(baseWidth).trainInfoArea]}>
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
    container: {
      width: '100%',
      aspectRatio: cardRatio,
      alignItems: 'center',
      borderRadius: autoFontSize(12),
      overflow: 'hidden',
      backgroundColor: 'white',
      ...commonStyles.shadow,
    },
    cardInfo: {
      width: '90%',
      height: '100%',
    },
    areaCommon: {
      flexDirection: 'row',
    },

    headArea: {
      top: '3%',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    cardNumber: {
      left: '2%',
      fontSize: autoFontSize(22, baseWidth),
      color: 'red',
    },
    checkWindow: {
      fontSize: autoFontSize(19, baseWidth),
    },

    stationArea: {
      top: '2%',
      height: '13%',
      justifyContent: 'space-between',
    },
    stationStart: {
      width: '40%',
    },
    stationEnd: {
      width: '40%',
    },
    stationCN: {
      fontSize: autoFontSize(29, baseWidth),
      textAlign: 'center',
    },
    trainNumber: {
      position: 'absolute',
      top: '9%',
      left: '38%',
      width: '25%',
      fontSize: autoFontSize(26, baseWidth),
      textAlign: 'center',
    },

    stationENArea: {
      justifyContent: 'space-between',
    },
    stationEN: {
      width: '40%',
      fontSize: autoFontSize(17, baseWidth),
      textAlign: 'center',
    },

    trainDateArea: {
      justifyContent: 'space-between',
      top: '-1%',
    },
    trainDateTime: {
      gap: '9.5%',
    },
    trainSeatNumber: {
      width: '32%',
      gap: '22%',
    },
    trainDateText: {
      fontSize: autoFontSize(18, baseWidth),
    },

    trainPayArea: {
      top: '-1%',
      height: '7%',
    },
    trainPay: {
      left: '4%',
      fontSize: autoFontSize(19, baseWidth),
    },
    trainMark: {
      position: 'absolute',
      left: '40.5%',
      flexDirection: 'row',
      gap: '3%',
    },
    markCircle: {
      borderWidth: 1,
      borderRadius: 50,
      width: autoFontSize(20, baseWidth),
      height: autoFontSize(20, baseWidth),
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    trainMarkText: {
      fontSize: autoFontSize(16, baseWidth),
    },
    trainSeatType: {
      position: 'absolute',
      left: '79%',
      fontSize: autoFontSize(17, baseWidth),
    },

    trainInfoArea: {
      height: '17%',
    },
    trainInfoText: {
      fontSize: autoFontSize(17, baseWidth),
    },

    passengerArea: {
      fontSize: autoFontSize(20, baseWidth),
    },

    cardTipArea: {
      borderWidth: 1,
      borderStyle: 'dashed',
      width: '64%',
      left: '5%',
      height: '14%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    cardTipText: {
      fontSize: autoFontSize(15, baseWidth),
    },

    QRcodeArea: {
      position: 'absolute',
      top: '61%',
      left: '79%',
    },

    cardCodeArea: {
      top: '5.5%',
      fontSize: autoFontSize(16, baseWidth),
    },
  });
