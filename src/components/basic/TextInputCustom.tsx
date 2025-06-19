import { t } from 'i18next';
import React, { useRef } from 'react';
import { useState } from 'react';
import {
  Dimensions,
  Keyboard,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { randomString } from '../../utils/utils';

import Cell, { Props as CellProps } from './Cell';

export type KeyboardType =
  | 'number'
  | 'decimal'
  | 'idCard'
  | 'trainNumber'
  | 'siteNumber';

interface Props extends CellProps {
  keyboardType: KeyboardType;
  value?: string;
  closeLabel?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

export default (props: Props) => {
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const inputValue = props.value ?? '';
  const [cursorPos, setCursorPos] = useState<number>(0);
  const textInputRef = useRef<TextInput>(null);

  const CLOSE = props.closeLabel ?? '⌫';

  const setInputValue = (value: string) => {
    props.onValueChange?.(value);
  };

  const keyButtons = (type: KeyboardType) => {
    if (type === 'number') {
      return [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['', '0', CLOSE],
      ];
    }
    if (type === 'decimal') {
      return [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['.', '0', CLOSE],
      ];
    }
    if (type === 'idCard') {
      return [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['X', '0', CLOSE],
      ];
    }
    if (type === 'trainNumber') {
      return [
        ['G', 'D', '1', '2', '3'],
        ['C', 'K', '4', '5', '6'],
        ['L', 'T', '7', '8', '9'],
        ['Z', 'Y', 'S', '0', CLOSE],
      ];
    }
    if (type === 'siteNumber') {
      return [
        ['无座', 'A', '1', '2', '3'],
        ['上', 'B', '4', '5', '6'],
        ['中', 'C', '7', '8', '9'],
        ['下', 'D', 'F', '0', CLOSE],
      ];
    }
    return [];
  };

  const handleKeyboardOpen = () => {
    setKeyboardVisible(true);
  };

  const handleKeyboardClose = () => {
    setKeyboardVisible(false);
    Keyboard.dismiss();
  };

  const handlePress = (key: string) => {
    if (key === CLOSE) {
      cursorPos === 0
        ? setInputValue(inputValue)
        : setInputValue(
            inputValue.slice(0, cursorPos - 1) + inputValue.slice(cursorPos),
          );
    } else {
      setInputValue(
        inputValue.slice(0, cursorPos) + key + inputValue.slice(cursorPos),
      );
      textInputRef.current?.setSelection(cursorPos + 1, cursorPos + 1);
    }
  };

  const renderKeyboardButton = (key: string, rowNumber: number) => (
    <TouchableOpacity
      key={randomString()}
      style={[
        styles.keyButton,
        {
          width: Dimensions.get('window').width / rowNumber - 2,
        },
      ]}
      onPress={() => key && handlePress(key)}>
      <Text style={styles.keyText}>{key}</Text>
    </TouchableOpacity>
  );

  return (
    <Cell {...props}>
      <TextInput
        ref={textInputRef}
        value={inputValue}
        style={styles.textInput}
        placeholder={props.placeholder ?? t('component.textInput.placeholder')}
        onFocus={handleKeyboardOpen}
        onPressOut={handleKeyboardOpen}
        onBlur={handleKeyboardClose}
        showSoftInputOnFocus={false}
        onSelectionChange={({ nativeEvent: { selection } }) =>
          setCursorPos(selection.start)
        }
      />

      <Modal
        visible={keyboardVisible}
        statusBarTranslucent
        transparent
        onRequestClose={handleKeyboardClose}
        animationType="slide"
        presentationStyle="overFullScreen">
        <View style={styles.modal} onTouchEnd={handleKeyboardClose} />
        <View style={styles.keyboard}>
          {keyButtons(props.keyboardType).map((row, i) => (
            <View key={`row-${i}`} style={styles.keyboardRow}>
              {row.map(key => renderKeyboardButton(key, row.length))}
            </View>
          ))}
        </View>
      </Modal>
    </Cell>
  );
};

const styles = StyleSheet.create({
  keyButton: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 50,
    justifyContent: 'center',
    marginBottom: 2,
    textAlign: 'center',
  },
  keyText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  keyboard: {
    alignItems: 'center',
    backgroundColor: '#ddd',
    bottom: 0,
    justifyContent: 'center',
    paddingVertical: 20,
    position: 'absolute',
    width: '100%',
  },
  keyboardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modal: {
    ...StyleSheet.absoluteFillObject,
  },
  textInput: {
    flexShrink: 1,
    margin: 0,
    padding: 0,
  },
});
