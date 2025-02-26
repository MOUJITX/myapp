import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import CustomKeyboard from './components/basic/CustomKeyboard';

export const PageC = () => {
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleKeyPress = (key: string) => {
    if (key === '⌫') {
      setInputValue(prev => prev.slice(0, -1));
    } else if (key === '确认') {
      setKeyboardVisible(false);
    } else {
      setInputValue(prev => prev + key);
    }
  };

  return (
    <View>
      <Text>Page C</Text>
      <TextInput
        onFocus={() => setKeyboardVisible(true)}
        value={inputValue}
        onBlur={() => setKeyboardVisible(false)}
        keyboardType="web-search"
      />
      <Text>{inputValue}</Text>
      {keyboardVisible && (
        <CustomKeyboard
          onKeyPress={handleKeyPress}
          onClose={() => setKeyboardVisible(false)}
        />
      )}
    </View>
  );
};
