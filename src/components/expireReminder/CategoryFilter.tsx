import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { ReminderCategoryScreen } from '../../screens/expireReminder/reminderCategoryScreen/reminderCategoryScreen';
import { GoodCategory } from '../../store/expireReminder/expireReminder.type';
import { commonStyles } from '../../styles';

interface Props {
  data: GoodCategory[];
  selectedValue: string;
  onSelect: (value: string) => void;
  showMoreButton?: boolean;
}

export default (props: Props) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollRow}>
        {props.data.map((item, index) => {
          const isSelected = item.categoryID === props.selectedValue;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => props.onSelect(item.categoryID)}
              style={styles.button}>
              <Text
                style={[
                  styles.text,
                  isSelected ? styles.selectedText : styles.defaultText,
                ]}>
                {item.label}
              </Text>
              {isSelected && <View style={styles.underline} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      {props.showMoreButton && (
        <View style={styles.moreButton}>
          <ReminderCategoryScreen
            selected={props.selectedValue}
            onSelect={props.onSelect}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
  },
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    paddingBottom: commonStyles.spacings.small,
  },
  defaultText: {
    color: commonStyles.textColor.info,
    fontSize: commonStyles.fontSize.largeX,
  },
  moreButton: {
    marginLeft: 5,
  },
  scrollRow: {
    alignItems: 'baseline',
    gap: commonStyles.spacings.small,
  },
  selectedText: {
    color: commonStyles.textColor.default,
    fontSize: commonStyles.fontSize.large3X,
  },
  text: {
    fontWeight: 'bold',
    paddingHorizontal: commonStyles.spacings.small3X,
  },
  underline: {
    backgroundColor: commonStyles.color.green,
    borderRadius: commonStyles.radius.medium,
    height: 4,
    marginTop: -6,
    width: '100%',
    zIndex: -1,
  },
});
