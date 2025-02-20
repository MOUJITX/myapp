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

const TextSingleLine = ({
  label,
  style,
}: {
  label: string;
  style?: StyleProp<TextStyle>;
}) => (
  <Text numberOfLines={1} ellipsizeMode="clip" style={style}>
    {label}
  </Text>
);

export default () => {
  const [baseWidth, setBaseWidth] = useState<number>(300);

  const onLayout = (event: LayoutChangeEvent) => {
    setBaseWidth(event.nativeEvent.layout.width);
  };

  return (
    <ImageBackground
      source={require('../../assets/img/trainTicket2.jpg')}
      style={styles(baseWidth).container}
      resizeMode="contain"
    >
      <View style={styles(baseWidth).cardInfo} onLayout={onLayout}>
        <View
          style={[styles(baseWidth).areaCommon, styles(baseWidth).headArea]}
        >
          <TextSingleLine
            label={'ED51944289'}
            style={styles(baseWidth).cardNumber}
          />
          <TextSingleLine
            label={'检票：一楼检票口1 '}
            style={styles(baseWidth).checkWindow}
          />
        </View>
        <View
          style={[styles(baseWidth).areaCommon, styles(baseWidth).stationArea]}
        >
          <View style={styles(baseWidth).stationStart}>
            <TextSingleLine
              label={'温   岭'}
              style={styles(baseWidth).stationCN}
            />
          </View>
          <TextSingleLine
            label={'G747555666'}
            style={styles(baseWidth).trainNumber}
          />
          <View style={styles(baseWidth).stationEnd}>
            <TextSingleLine
              label={'温州南'}
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
            label={'Wenling'}
            style={styles(baseWidth).stationEN}
          />
          <TextSingleLine
            label={'Wenzhounan'}
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
              label="2020"
              style={styles(baseWidth).trainDateText}
            />
            <TextSingleLine
              label="01"
              style={styles(baseWidth).trainDateText}
            />
            <TextSingleLine
              label="22"
              style={styles(baseWidth).trainDateText}
            />
            <TextSingleLine
              label="08:54"
              style={styles(baseWidth).trainDateText}
            />
          </View>
          <View
            style={[
              styles(baseWidth).areaCommon,
              styles(baseWidth).trainSitNumber,
            ]}
          >
            <TextSingleLine
              label="04"
              style={styles(baseWidth).trainDateText}
            />
            <TextSingleLine
              label="11F"
              style={styles(baseWidth).trainDateText}
            />
          </View>
        </View>
        <View
          style={[styles(baseWidth).areaCommon, styles(baseWidth).trainPayArea]}
        >
          <TextSingleLine label="31.0" style={[styles(baseWidth).trainPay]} />
          <View style={[styles(baseWidth).trainMark]}>
            {['惠', '学'].map((mark, index) => (
              <View style={styles(baseWidth).markCircle} key={index}>
                <TextSingleLine
                  label={mark}
                  style={[styles(baseWidth).trainMarkText]}
                />
              </View>
            ))}
          </View>
          <TextSingleLine
            label="二等座"
            style={[styles(baseWidth).trainSitType]}
          />
        </View>
        <View style={[styles(baseWidth).trainInfoArea]}>
          <TextSingleLine
            label="行一"
            style={styles(baseWidth).trainInfoText}
          />
          <TextSingleLine
            label="仅供"
            style={styles(baseWidth).trainInfoText}
          />
        </View>
        <TextSingleLine
          label="3310812001****801X 季双节"
          style={styles(baseWidth).passengerArea}
        />
        <View style={styles(baseWidth).cardTipArea}>
          <TextSingleLine
            label="买票请到12306 发货请到95306"
            style={styles(baseWidth).cardTipText}
          />
          <TextSingleLine label="行二" style={styles(baseWidth).cardTipText} />
        </View>
        <View style={styles(baseWidth).QRcodeArea}>
          <QRCode
            value="http://awesome.link.qr"
            backgroundColor="rgba(0,0,0,0)"
            size={autoFontSize(65, baseWidth)}
          />
        </View>
        <TextSingleLine
          label="33108100200122ED51944289 JM"
          style={styles(baseWidth).cardCodeArea}
        />
      </View>
    </ImageBackground>
  );
};

const styles = (baseWidth: number) =>
  StyleSheet.create({
    container: {
      width: '100%',
      aspectRatio: 1077 / 666,
      // aspectRatio: 2782 / 1755,
      alignItems: 'center',
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
    },
    stationStart: {
      left: '5%',
      width: '23%',
    },
    stationEnd: {
      left: '26%',
      width: '23%',
    },
    stationCN: {
      fontSize: autoFontSize(29, baseWidth),
      textAlign: 'center',
    },
    trainNumber: {
      top: '9%',
      left: '18%',
      width: '18%',
      fontSize: autoFontSize(26, baseWidth),
      textAlign: 'center',
    },

    stationENArea: {
      width: '89%',
      left: '5%',
      justifyContent: 'space-between',
    },
    stationEN: {
      width: '30%',
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
    trainSitNumber: {
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
    trainSitType: {
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
