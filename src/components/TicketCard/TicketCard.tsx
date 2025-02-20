import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground, // 新增图片背景组件
  Text,
  StyleProp,
  TextStyle,
} from 'react-native';
import { autoFontSize } from '../../utils/autoSize';

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
  return (
    <ImageBackground
      source={require('../../assets/img/trainTicket.jpg')}
      style={styles.container}
      resizeMode="contain"
    >
      <View style={styles.cardInfo}>
        <View style={[styles.areaCommon, styles.headArea]}>
          <TextSingleLine label={'ED51944289'} style={styles.cardNumber} />
          <TextSingleLine
            label={'检票：一楼检票口1 '}
            style={styles.checkWindow}
          />
        </View>
        <View style={[styles.areaCommon, styles.stationArea]}>
          <View style={styles.stationStart}>
            <TextSingleLine label={'温一岭'} style={styles.stationCN} />
          </View>
          <TextSingleLine label={'G747555666'} style={styles.trainNumber} />
          <View style={styles.stationEnd}>
            <TextSingleLine label={'温州南'} style={styles.stationCN} />
          </View>
        </View>
        <View style={[styles.areaCommon, styles.stationENArea]}>
          <TextSingleLine label={'Wenling'} style={styles.stationEN} />
          <TextSingleLine label={'Wenzhounan'} style={styles.stationEN} />
        </View>
        <View style={[styles.areaCommon, styles.trainDateArea]}>
          <View style={[styles.areaCommon, styles.trainDateTime]}>
            <TextSingleLine label="2020" style={styles.trainDateText} />
            <TextSingleLine label="01" style={styles.trainDateText} />
            <TextSingleLine label="22" style={styles.trainDateText} />
            <TextSingleLine label="08:54" style={styles.trainDateText} />
          </View>
          <View style={[styles.areaCommon, styles.trainSitNumber]}>
            <TextSingleLine label="04" style={styles.trainDateText} />
            <TextSingleLine label="11F" style={styles.trainDateText} />
          </View>
        </View>
        <View style={[styles.areaCommon, styles.trainPayArea]}>
          <TextSingleLine label="31.0" style={[styles.trainPay]} />
          <View style={[styles.trainMark]}>
            {['惠', '学'].map(mark => (
              <View style={styles.markCircle}>
                <TextSingleLine label={mark} style={[styles.trainMarkText]} />
              </View>
            ))}
          </View>
          <TextSingleLine label="二等座" style={[styles.trainSitType]} />
        </View>
        <View style={[styles.trainInfoArea]}>
          <TextSingleLine label="行一" style={styles.trainInfoText} />
          <TextSingleLine label="仅供" style={styles.trainInfoText} />
        </View>
        <TextSingleLine
          label="3310812001****801X 季双节"
          style={styles.passengerArea}
        />
        <View style={styles.cardTipArea}>
          <TextSingleLine
            label="买票请到12306 发货请到95306"
            style={styles.cardTipText}
          />
          <TextSingleLine label="行二" style={styles.cardTipText} />
        </View>
        <View style={styles.QRcodeArea} />
        <TextSingleLine
          label="33108100200122ED51944289 JM"
          style={styles.cardCodeArea}
        />
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 2782 / 1755,
    alignItems: 'center',
  },
  cardInfo: {
    width: '90%',
    height: '100%',

    borderWidth: 1,
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
    fontSize: autoFontSize(19),
    color: 'red',
  },
  checkWindow: {
    fontSize: autoFontSize(16),
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
    fontSize: autoFontSize(27),
    textAlign: 'center',
  },
  trainNumber: {
    top: '9%',
    left: '18%',
    width: '18%',
    fontSize: autoFontSize(23),
    textAlign: 'center',
  },

  stationENArea: {
    width: '89%',
    left: '5%',
    justifyContent: 'space-between',
  },
  stationEN: {
    width: '30%',
    fontSize: autoFontSize(14),
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
    fontSize: autoFontSize(17),
  },

  trainPayArea: {
    top: '-1%',
    height: '7%',
  },
  trainPay: {
    left: '4%',
    fontSize: autoFontSize(18),
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
    width: autoFontSize(17),
    height: autoFontSize(17),
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  trainMarkText: {
    fontSize: autoFontSize(16),
  },
  trainSitType: {
    position: 'absolute',
    left: '79%',
    fontSize: autoFontSize(16),
  },

  trainInfoArea: {
    height: '17%',
  },
  trainInfoText: {
    fontSize: autoFontSize(16),
  },

  passengerArea: {
    fontSize: autoFontSize(18),
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
    fontSize: autoFontSize(13),
  },

  QRcodeArea: {},

  cardCodeArea: {
    top: '5.5%',
    fontSize: autoFontSize(14),
  },
});
