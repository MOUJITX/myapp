import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { commonStyles } from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import { GoodCategory } from '../../store/expireReminder/expireReminder.type';
import { ReminderCategoryScreen } from '../../screens/expireReminder/reminderCategoryScreen/reminderCategoryScreen';

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
        contentContainerStyle={styles.scrollRow}
      >
        {props.data.map((item, index) => {
          const isSelected = item.categoryID === props.selectedValue;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => props.onSelect(item.categoryID)}
              style={styles.button}
            >
              <Text
                style={[
                  styles.text,
                  isSelected ? styles.selectedText : styles.defaultText,
                ]}
              >
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
  container: {
    paddingBottom: commonStyles.spacings.small,
    flexDirection: 'row',
  },
  scrollRow: {
    gap: commonStyles.spacings.small,
    alignItems: 'baseline',
  },
  button: {
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    paddingHorizontal: commonStyles.spacings.small3X,
  },
  selectedText: {
    color: commonStyles.textColor.default,
    fontSize: commonStyles.fontSize.large3X,
  },
  defaultText: {
    color: commonStyles.textColor.info,
    fontSize: commonStyles.fontSize.largeX,
  },
  underline: {
    height: 4,
    backgroundColor: commonStyles.color.green,
    width: '100%',
    borderRadius: commonStyles.radius.medium,
    marginTop: -6,
    zIndex: -1,
  },
  moreButton: {
    marginLeft: 5,
  },
});
