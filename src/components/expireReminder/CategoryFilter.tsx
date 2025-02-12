import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { commonStyles } from '../../styles';
import { ScrollView } from 'react-native-gesture-handler';

interface ScrollButton {
  label: string;
  value: string;
}

interface Props {
  data: ScrollButton[];
  selectedValue: string;
  onSelect: (value: string) => void;
}

export default ({ data, selectedValue, onSelect }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {data.map((item, index) => {
        const isSelected = item.value === selectedValue;
        return (
          <TouchableOpacity
            key={index}
            onPress={() => onSelect(item.value)}
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
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    gap: 16,
  },
  button: {
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  selectedText: {
    color: '#000',
  },
  defaultText: {
    color: '#888',
  },
  underline: {
    height: 4,
    backgroundColor: commonStyles.color.green,
    width: '100%',
    borderRadius: 10,
  },
});
