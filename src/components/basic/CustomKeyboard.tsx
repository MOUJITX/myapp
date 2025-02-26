import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface CustomKeyboardProps {
  onKeyPress: (value: string) => void;
  onClose: () => void;
}

export default ({ onKeyPress, onClose }: CustomKeyboardProps) => {
  const numberRows = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '⌫'],
  ];

  const letterRow = ['A', 'B', 'C', 'D', 'F'];

  return (
    <View style={styles.container}>
      {/* Number grid */}
      {numberRows.map((row, i) => (
        <View key={`row-${i}`} style={styles.row}>
          {row.map(key => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => onKeyPress(key)}
            >
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      {/* Letter row */}
      <View style={styles.row}>
        {letterRow.map(key => (
          <TouchableOpacity
            key={key}
            style={styles.key}
            onPress={() => onKeyPress(key)}
          >
            <Text style={styles.keyText}>{key}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Action buttons */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.key, styles.closeKey]}
          onPress={onClose}
        >
          <Text style={styles.keyText}>关闭</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.key, styles.confirmKey]}
          onPress={() => onKeyPress('确认')}
        >
          <Text style={styles.keyText}>确认</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e0e0e0',
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 5,
  },
  key: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 3,
    padding: 15,
    minWidth: 60,
    alignItems: 'center',
  },
  keyText: {
    fontSize: 20,
  },
  closeKey: {
    backgroundColor: '#ff4444',
  },
  confirmKey: {
    backgroundColor: '#4CAF50',
  },
});
