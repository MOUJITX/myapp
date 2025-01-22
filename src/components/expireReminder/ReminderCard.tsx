import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CellGroup from '../basic/CellGroup';
import Image from '../basic/Image';
import { t } from 'i18next';
import Divider from '../basic/Divider';
import { commonStyles } from '../../styles';

interface Props {
  /** 提醒项标题 */
  title: string;
  /** 提醒项图片URL */
  img: string;
  /** 剂量信息(可选) - 仅用于药品类提醒 */
  dosage?: string;
  /** 服用频率(可选) - 仅用于药品类提醒 */
  frequency?: string;
  /** 储藏条件(可选) */
  storage?: string;
  items: {
    isExpired: boolean;
    expireDate: Date;
  }[];
}

export default (props: Props) => {
  const daysUntilExpiry = (expireDate: Date) =>
    Math.ceil(
      (expireDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24)
    );

  return (
    <CellGroup card>
      <View style={styles.main}>
        <Image img={props.img} size={'medium'} radius />
        <View style={styles.mainDetail}>
          <View style={styles.titleRow}>
            <Text
              style={[styles.titleLabel]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {props.title}
            </Text>
          </View>
          {(props.dosage || props.frequency || props.storage) && (
            <View style={styles.infoRow}>
              {[
                props.dosage && {
                  icon: t('expireReminder.info.dosage.icon'),
                  text: t('expireReminder.info.dosage.text', {
                    dosage: props.dosage,
                  }),
                },
                props.frequency && {
                  icon: t('expireReminder.info.frequency.icon'),
                  text: t('expireReminder.info.frequency.text', {
                    frequency: props.frequency,
                  }),
                },
                props.storage && { icon: '🌡️', text: props.storage },
              ]
                .filter((item): item is { icon: string; text: string } =>
                  Boolean(item)
                )
                .map((item, index) => (
                  <Text key={index} style={styles.infoText}>
                    {item.icon} {item.text}
                  </Text>
                ))}
            </View>
          )}
        </View>
      </View>
      <Divider />
      {props.items.map((item, index) => (
        <View style={styles.bottomInfo} key={index}>
          <View style={styles.leftBottomInfo}>
            <View style={styles.statusContainer}>
              <View
                style={[
                  styles.statusDot,
                  item.isExpired ? styles.expiredDot : styles.validDot,
                ]}
              />
              <Text
                style={[
                  styles.statusText,
                  item.isExpired ? styles.expiredText : styles.validText,
                ]}
              >
                {t(
                  `expireReminder.status.${item.isExpired ? 'expired' : 'valid'}`
                )}
              </Text>
            </View>
            {!item.isExpired && (
              <View style={styles.daysLeftContainer}>
                <Text style={styles.daysNumber}>
                  {daysUntilExpiry(item.expireDate)}
                </Text>
                <Text style={styles.daysText}>
                  {daysUntilExpiry(item.expireDate) === 1
                    ? t('expireReminder.status.dayLeft')
                    : t('expireReminder.status.daysLeft')}
                </Text>
              </View>
            )}
          </View>
          <Text style={styles.dateText}>
            {item.expireDate.toLocaleDateString()}
          </Text>
        </View>
      ))}
    </CellGroup>
  );
};

const styles = StyleSheet.create({
  main: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mainDetail: {
    flex: 1,
    marginLeft: commonStyles.spacings.small,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    minHeight: commonStyles.lineHeight.largeX,
  },
  titleLabel: {
    flex: 1,
    fontSize: commonStyles.fontSize.largeX,
    fontWeight: 'bold',
    lineHeight: commonStyles.lineHeight.largeX,
  },

  infoRow: {
    flexDirection: 'row',
    marginTop: commonStyles.spacings.smallX,
    flexWrap: 'wrap',
    gap: commonStyles.spacings.small,
  },
  infoText: {
    fontSize: commonStyles.fontSize.small,
    color: commonStyles.color.gray8,
  },

  bottomInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: commonStyles.spacings.small2X,
  },
  leftBottomInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: commonStyles.spacings.smallX,
  },

  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: commonStyles.spacings.small2X,
  },
  validDot: {
    backgroundColor: commonStyles.statusColor.success,
  },
  expiredDot: {
    backgroundColor: commonStyles.statusColor.danger,
  },
  statusText: {
    fontSize: commonStyles.fontSize.medium,
  },
  validText: {
    color: commonStyles.statusColor.success,
  },
  expiredText: {
    color: commonStyles.statusColor.danger,
  },

  daysLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  daysNumber: {
    fontSize: commonStyles.fontSize.largeX,
    fontWeight: '600',
    color: commonStyles.statusColor.success,
  },
  daysText: {
    fontSize: commonStyles.fontSize.small,
    color: commonStyles.statusColor.success,
  },
  dateText: {
    fontSize: commonStyles.fontSize.small,
    color: commonStyles.color.gray6,
    fontWeight: '500',
  },
});
