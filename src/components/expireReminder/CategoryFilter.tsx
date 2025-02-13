import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { commonStyles } from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';
import Button, { ButtonShapeType } from '../basic/Button';

interface ScrollButton {
  label: string;
  value: string;
}

interface Props {
  data: ScrollButton[];
  selectedValue: string;
  onSelect: (value: string) => void;
  onPressMoreButton?: () => void;
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
          const isSelected = item.value === props.selectedValue;
          return (
            <TouchableOpacity
              key={index}
              onPress={() => props.onSelect(item.value)}
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
      {props.onPressMoreButton && (
        <View style={styles.moreButton}>
          <Button
            shape={ButtonShapeType.Square}
            size="small"
            label="+"
            shadow
            onPress={props.onPressMoreButton}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: commonStyles.spacings.small,
    flexDirection: 'row',
  },
  scrollRow: {
    gap: commonStyles.spacings.small,
  },
  button: {
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: commonStyles.fontSize.largeX,
    paddingHorizontal: commonStyles.spacings.small3X,
  },
  selectedText: {
    color: commonStyles.textColor.default,
  },
  defaultText: {
    color: commonStyles.textColor.info,
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
