import React from 'react';
import {
  StyleSheet,
  View,
  ImageBackground, // 新增图片背景组件
  Text,
  StyleProp,
  TextStyle,
} from 'react-native';

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
        <View style={styles.headArea}>
          <TextSingleLine label={'ED51944289'} style={styles.cardNumber} />
          <TextSingleLine
            label={'检票：一楼检票口1'}
            style={styles.checkWindow}
          />
        </View>
        <View style={styles.stationArea}>
          <View style={styles.stationStart}>
            <TextSingleLine label={'温岭'} style={styles.stationCN} />
          </View>
          <TextSingleLine label={'G747555666'} style={styles.trainNumber} />
          <View style={styles.stationEnd}>
            <TextSingleLine label={'温州南'} style={styles.stationCN} />
          </View>
        </View>
        <View style={styles.stationENArea}>
          <TextSingleLine label={'Wenling'} style={styles.stationEN} />
          <TextSingleLine label={'Wenzhounan'} style={styles.stationEN} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    aspectRatio: 2782 / 1755,
  },
  cardInfo: {
    width: '100%',
    height: '100%',
    borderWidth: 1,
  },
  textCommon: {
    textAlign: 'center',
  },

  headArea: {
    top: '3%',
    left: '7%',
    width: '86%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 20,
    color: 'red',
  },
  checkWindow: {
    fontSize: 16,
  },

  stationArea: {
    top: '1%',
    height: '12%',
    flexDirection: 'row',

    borderWidth: 1,
  },
  stationStart: {
    position: 'absolute',
    left: '15%',
    width: '20%',

    borderWidth: 1,
  },
  stationEnd: {
    position: 'absolute',
    right: '20%',
  },
  stationCN: {
    fontSize: 28,
  },
  trainNumber: {
    position: 'absolute',
    top: '5%',
    left: '42%',
    width: '19%',
    fontSize: 23,
    textAlign: 'center',
  },

  stationENArea: {
    left: '10%',
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',

    borderWidth: 1,
  },
  stationEN: {
    width: '31%',
    fontSize: 13,
    borderWidth: 1,
    textAlign: 'center',

    color: 'red',
  },
});
