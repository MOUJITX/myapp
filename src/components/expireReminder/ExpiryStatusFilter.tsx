import { t } from 'i18next';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { commonStyles } from '../../styles';
import Button from '../basic/Button';

interface Props {
  filters: { label: string; filter: string }[];
  selected?: string;
  onFilter: (filter?: string) => void;
}

const ExpiryStatusFilter = (props: Props) => {
  const handleFilter = (filter: string) => {
    if (filter === props.selected) {
      props.onFilter();
    } else {
      props.onFilter(filter);
    }
  };

  return (
    <View style={style.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.filterButtons}>
        {props.filters.map((filter, key) => (
          <Button
            label={filter.label}
            plain={filter.filter !== props.selected}
            type="primary"
            onPress={() => handleFilter(filter.filter)}
            size="small"
            key={key}
            rightIcon={
              filter.filter === props.selected
                ? t('common.close.icon')
                : undefined
            }
          />
        ))}
      </ScrollView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: commonStyles.spacings.small,
  },
  filterButtons: {
    alignItems: 'baseline',
    gap: commonStyles.spacings.smallX,
  },
});

export default ExpiryStatusFilter;
