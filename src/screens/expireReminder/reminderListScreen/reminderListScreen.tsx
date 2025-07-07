import { t } from 'i18next';
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { ButtonShapeType } from '../../../components/basic/Button';
import HoverButton from '../../../components/basic/HoverButton';
import SpacingView from '../../../components/basic/SpacingView';
import SwipeRowList from '../../../components/basic/SwipeRowList';
import CategoryFilter from '../../../components/expireReminder/CategoryFilter';
import ExpiryStatusFilter from '../../../components/expireReminder/ExpiryStatusFilter';
import ReminderCard, {
  getExpiryStatus,
} from '../../../components/expireReminder/ReminderCard';
import {
  ExpiryStatus,
  Good,
  GoodItem,
} from '../../../store/expireReminder/expireReminder.type';

import { useExpireReminderListHook } from './reminderListHook';

export const ExpireReminderListScreen = () => {
  const {
    input: { allExpireReminderList, allGoodCategoriesList },
    output: { handleRemoveGood, gotoReminderAddScreen },
  } = useExpireReminderListHook();

  const [selectCategory, setSelectCategory] = useState<string>('all');
  const [selectExpiryStatus, setSelectExpiryStatus] = useState<string>();
  const [reminderList, setReminderList] = useState<Good[]>(
    allExpireReminderList,
  );

  const renderGoodItem = ({ item }: { item: Good }) => {
    return (
      <ReminderCard good={item} onPress={() => gotoReminderAddScreen(item)} />
    );
  };

  const filterReminderList = (category: string, status?: string) => {
    const filterItems = (items: GoodItem[]) =>
      items.filter(
        item => getExpiryStatus(item.expireDate!, item.isUsed) === status,
      );

    const filterGoods = (goods: Good[]) =>
      goods
        .map(good => ({ ...good, items: filterItems(good.items) }))
        .filter(good => good.items.length > 0);

    if (category === 'all' && !status) {
      setReminderList(allExpireReminderList);
    } else if (category === 'all') {
      setReminderList(filterGoods(allExpireReminderList));
    } else if (!status) {
      setReminderList(
        allExpireReminderList.filter(good => good.type === category),
      );
    } else {
      setReminderList(
        filterGoods(allExpireReminderList).filter(
          good => good.type === category,
        ),
      );
    }
  };

  const handleSelectCategory = (category: string) => {
    setSelectCategory(category);
    filterReminderList(category, selectExpiryStatus);
  };

  const handleSelectExpireStatus = (status?: string) => {
    setSelectExpiryStatus(status);
    filterReminderList(selectCategory, status);
  };

  useEffect(() => {
    filterReminderList(selectCategory, selectExpiryStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allExpireReminderList]);

  return (
    <View style={style.container}>
      <SpacingView notScroll>
        <CategoryFilter
          data={allGoodCategoriesList}
          selectedValue={selectCategory}
          onSelect={handleSelectCategory}
          showMoreButton
        />
        <ExpiryStatusFilter
          filters={Object.values(ExpiryStatus).map(status => ({
            label: t(`expireReminder.status.${status}`),
            filter: status,
          }))}
          onFilter={handleSelectExpireStatus}
          selected={selectExpiryStatus}
        />
        <SwipeRowList
          renderItem={renderGoodItem}
          data={reminderList}
          rightButton={[
            {
              label: '-',
              type: 'danger',
              onPress: (item: Good) => handleRemoveGood(item.goodID),
              pressConfirm: {
                title: t('common.delete.confirm.title'),
                description: t('common.delete.confirm.description'),
              },
            },
          ]}
          shape={ButtonShapeType.Circle}
          size="large"
        />
      </SpacingView>

      <HoverButton
        onPress={() => gotoReminderAddScreen()}
        label={t('common.add.icon')}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});
