import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CellGroup from '../basic/CellGroup';
import Image from '../basic/Image';
import { t } from 'i18next';
import Divider from '../basic/Divider';
import { commonStyles } from '../../styles';
import {
  ExpiryStatus,
  Good,
} from '../../store/expireReminder/expireReminder.type';
import { calculateDays } from '../../utils/datetime';

interface Props {
  good: Good;
}

const getDaysUntilExpiry = (expireDate: Date) =>
  calculateDays(new Date(expireDate), new Date());

const getExpiryStatus = (expireDate: Date) => {
  const days = getDaysUntilExpiry(expireDate);
  return days <= 0
    ? ExpiryStatus.Expired
    : days <= 30
      ? ExpiryStatus.Soon
      : ExpiryStatus.Valid;
};

const InfoRow = ({
  dosage,
  frequency,
  storage,
}: {
  dosage?: string;
  frequency?: string;
  storage?: string;
}) => {
  const infoItems = [
    dosage && {
      icon: t('expireReminder.info.dosage.icon'),
      text: t('expireReminder.info.dosage.text', { dosage }),
    },
    frequency && {
      icon: t('expireReminder.info.frequency.icon'),
      text: t('expireReminder.info.frequency.text', { frequency }),
    },
    storage && {
      icon: t('expireReminder.info.storage.icon'),
      text: t('expireReminder.info.storage.text', { storage }),
    },
  ].filter((item): item is { icon: string; text: string } => Boolean(item));

  return infoItems.length ? (
    <View style={styles.infoRow}>
      {infoItems.map((item, index) => (
        <Text key={index} style={styles.infoText}>
          {item.icon} {item.text}
        </Text>
      ))}
    </View>
  ) : null;
};

const StatusIndicator = ({ expireDate }: { expireDate: Date }) => {
  const status = getExpiryStatus(expireDate);
  const days = getDaysUntilExpiry(expireDate);
  const statusColor =
    commonStyles.statusColor[
      status === ExpiryStatus.Soon
        ? 'warning'
        : status === ExpiryStatus.Expired
          ? 'danger'
          : 'success'
    ];

  return (
    <View style={styles.leftBottomInfo}>
      <View style={styles.statusContainer}>
        <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
        <Text style={[styles.statusText, { color: statusColor }]}>
          {t(`expireReminder.status.${status}`)}
        </Text>
      </View>
      {status !== ExpiryStatus.Expired && (
        <View style={styles.daysLeftContainer}>
          <Text style={[styles.daysNumber, { color: statusColor }]}>
            {days}
          </Text>
          <Text style={[styles.daysText, { color: statusColor }]}>
            {t(`expireReminder.status.${days === 1 ? 'dayLeft' : 'daysLeft'}`)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default (props: Props) => {
  return (
    <CellGroup card>
      <View style={styles.main}>
        <Image img={props.good.imgs[0]} size={'medium'} radius />
        <View style={styles.mainDetail}>
          <Text
            style={styles.titleLabel}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {props.good.title}
          </Text>
          <InfoRow
            dosage={props.good.detail.dosage}
            frequency={props.good.detail.frequency}
            storage={props.good.detail.storage}
          />
        </View>
      </View>
      <Divider />
      {props.good.items.map((item, index) => (
        <View style={styles.bottomInfo} key={index}>
          {item.expireDate && (
            <>
              <StatusIndicator expireDate={item.expireDate} />
              <Text style={styles.dateText}>
                {item.expireDate
                  ? new Date(item.expireDate).toLocaleDateString()
                  : 'N/A'}
              </Text>
            </>
          )}
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
  titleLabel: {
    ...commonStyles.textSize.h3,
    fontWeight: 'bold',
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
  statusText: {
    fontSize: commonStyles.fontSize.medium,
  },
  daysLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: commonStyles.spacings.small2X,
  },
  daysNumber: {
    fontSize: commonStyles.fontSize.largeX,
    fontWeight: '600',
  },
  daysText: {
    fontSize: commonStyles.fontSize.small,
  },
  dateText: {
    fontSize: commonStyles.fontSize.small,
    color: commonStyles.color.gray6,
    fontWeight: '500',
  },
});
