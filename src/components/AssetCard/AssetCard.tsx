import { StyleSheet, Text, View } from 'react-native';

import {
  Asset,
  AssetBasic,
} from '../../store/assetManagement/assetManagement.type';
import { commonStyles } from '../../styles';
import { calculateDays } from '../../utils/datetime';
import { randomString } from '../../utils/utils';
import CellGroup from '../basic/CellGroup';
import Image from '../basic/Image';
import Tag from '../basic/Tag';

interface Props {
  asset: Asset;
  onPress: () => void;
}

const AssetCard = (props: Props) => {
  const { asset } = props;

  const calculateUsedDays = (
    calAsset: AssetBasic = asset,
    deactivateDate?: Date,
  ) => {
    if (deactivateDate) {
      return calculateDays(calAsset.purchasing.date, deactivateDate);
    }

    if (calAsset.using) {
      return calculateDays(calAsset.purchasing.date, new Date());
    } else {
      return calculateDays(calAsset.purchasing.date, calAsset.deactivateDate);
    }
  };

  const renderWarrantyTag = () => {
    const warrantyDays = calculateDays(new Date(), asset.warranty.overDate);

    if (warrantyDays > 0) {
      return `在保 · 剩余${warrantyDays}天`;
    } else {
      return '过保';
    }
  };

  const calculateTotalPrice = () => {
    return (
      asset.additionalFee.outcome.reduce(
        (prev, curr) => prev + curr.purchasing.price,
        0,
      ) + asset.purchasing.price
    );
  };

  const calculatePerDayPrice = (
    calAsset: AssetBasic,
    deactivateDate?: Date,
  ) => {
    if (deactivateDate) {
      if (calAsset.using) {
        return (
          calAsset.purchasing.price /
          calculateUsedDays(calAsset, deactivateDate)
        );
      } else {
        if (calAsset.deactivateDate! > deactivateDate) {
          return (
            calAsset.purchasing.price /
            calculateUsedDays(calAsset, deactivateDate)
          );
        } else {
          return calAsset.purchasing.price / calculateUsedDays(calAsset);
        }
      }
    } else {
      return calAsset.purchasing.price / calculateUsedDays(calAsset);
    }
  };

  const calculateDailyPrice = () => {
    const result =
      asset.additionalFee.outcome.reduce(
        (prev, curr) =>
          prev +
          calculatePerDayPrice(
            curr,
            asset.using ? undefined : asset.deactivateDate,
          ),
        0,
      ) + calculatePerDayPrice(asset);

    return result.toFixed(2);
  };

  return (
    <CellGroup card>
      <View style={styles.container}>
        <Image
          img={asset.imgs[0]}
          size={'medium'}
          radius
          preview
          folder="assets"
        />
        <View style={styles.informationMiddle}>
          <View style={styles.informationLine}>
            <Tag
              label={asset.using ? '服役中' : '已退役'}
              size={'small'}
              type={asset.using ? 'success' : 'info'}
            />
            <Text
              style={styles.titleLabel}
              numberOfLines={1}
              ellipsizeMode="tail">
              {randomString()}11111111
            </Text>
          </View>

          <View style={styles.informationLine}>
            <Text numberOfLines={1}>¥{calculateTotalPrice()}</Text>
            <Text numberOfLines={1}>¥{calculateDailyPrice()}/天</Text>
          </View>

          {asset.warranty.enabled && (
            <Text style={styles.infoLabel} numberOfLines={1}>
              {renderWarrantyTag()}
            </Text>
          )}
        </View>
        <View style={styles.informationRight}>
          <View style={styles.totalTitle}>
            <Text style={styles.totalTitleLabel}>{calculateUsedDays()}</Text>
            <Text style={styles.totalSubtitleLabel}>天</Text>
          </View>
          <Text style={styles.totalSubtitleLabel}>使用天数</Text>
        </View>
      </View>
    </CellGroup>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: commonStyles.spacings.smallX,
  },
  infoLabel: {
    color: commonStyles.textColor.info,
    fontSize: commonStyles.fontSize.small,
  },
  informationLine: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    gap: commonStyles.spacings.small2X,
  },
  informationMiddle: {
    flex: 1,
    gap: commonStyles.spacings.small2X,
  },
  informationRight: {
    alignItems: 'center',
    backgroundColor: commonStyles.backgroundColor.success,
    borderRadius: commonStyles.radius.small,
    gap: commonStyles.spacings.small3X,
    paddingHorizontal: commonStyles.spacings.small,
    paddingVertical: commonStyles.spacings.smallX,
  },
  titleLabel: {
    flex: 1,
    fontSize: commonStyles.fontSize.large,
    fontWeight: '600',
  },
  totalSubtitleLabel: {
    color: commonStyles.color.green,
    fontSize: commonStyles.fontSize.small,
  },
  totalTitle: {
    alignItems: 'baseline',
    flexDirection: 'row',
    gap: commonStyles.spacings.small3X,
    justifyContent: 'center',
  },
  totalTitleLabel: {
    color: commonStyles.color.green,
    fontSize: commonStyles.fontSize.largeX,
    fontWeight: '600',
  },
});

export default AssetCard;
