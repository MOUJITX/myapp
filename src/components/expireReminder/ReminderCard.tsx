import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CellGroup from '../basic/CellGroup';
import Image from '../basic/Image';
import { t } from 'i18next';
import Divider from '../basic/Divider';
import { commonStyles } from '../../styles';

interface Props {
  title: string;
  img: string;
  isExpired: boolean;
  expireDate: Date;
}

export default (props: Props) => {
  return (
    <CellGroup card>
      <View style={[styles.main]}>
        <Image img={props.img} size={'medium'} radius />
        <View style={[styles.mainDetail]}>
          <Text style={styles.titleLabel}>{props.title}</Text>
          <Text>{t('debug.longText')}</Text>
        </View>
      </View>
      <Divider />
      <View style={[styles.bottomInfo]}>
        <Text>{props.isExpired ? 'expired' : 'using'}</Text>
        <Text>{props.expireDate.toLocaleDateString()}</Text>
      </View>
    </CellGroup>
  );
};

const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainDetail: {
    marginLeft: commonStyles.spacings.smallX,
    flexShrink: 1,
  },
  titleLabel: {
    fontSize: commonStyles.fontSize.largeX,
    fontWeight: 'bold',
  },
  bottomInfo: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});
