import Clipboard from '@react-native-clipboard/clipboard';
import { t } from 'i18next';
import { useRef, useState } from 'react';
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

import { commonStyles } from '../../styles';
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
  deleteLabel?: string;
  placeholder?: string;
  onValueChange?: (value: string) => void;
}

export default (props: Props) => {
  const [systemKeyboard, setSystemKeyboard] = useState<boolean>(false);
  const [keyboardVisible, setKeyboardVisible] = useState<boolean>(false);
  const inputValue = props.value ?? '';
  const [cursorPos, setCursorPos] = useState<number>(0);
  const textInputRef = useRef<TextInput>(null);

  const DELETE = props.deleteLabel ?? t('common.delete.icon');

  const setInputValue = (value: string) => {
    if (props.keyboardType === 'number') {
      value = value.replace(/[^0-9]/g, '');
    }

    if (props.keyboardType === 'decimal') {
      value = value.replace(/[^0-9.]/g, '');

      if (value.split('.').length > 2) value = value.replace(/\.+$/, '');

      if (value.startsWith('.')) value = '0' + value;

      if (value.startsWith('0') && value.length > 1 && !value.startsWith('0.'))
        value = value.slice(1);
    }

    if (props.keyboardType === 'idCard') {
      value = value.replace(/[^0-9Xx]/g, '').replace('x', 'X');
    }

    props.onValueChange?.(value);
  };

  const keyButtons = (type: KeyboardType) => {
    if (type === 'number') {
      return [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['', '0', DELETE],
      ];
    }
    if (type === 'decimal') {
      return [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['.', '0', DELETE],
      ];
    }
    if (type === 'idCard') {
      return [
        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['X', '0', DELETE],
      ];
    }
    if (type === 'trainNumber') {
      return [
        ['G', 'D', '1', '2', '3'],
        ['C', 'K', '4', '5', '6'],
        ['L', 'T', '7', '8', '9'],
        ['Z', 'Y', 'S', '0', DELETE],
      ];
    }
    if (type === 'siteNumber') {
      return [
        ['无座', 'A', '1', '2', '3'],
        ['上', 'B', '4', '5', '6'],
        ['中', 'C', '7', '8', '9'],
        ['下', 'D', 'F', '0', DELETE],
      ];
    }
    return [];
  };

  const handleKeyboardOpen = () => {
    console.log('open');
    if (systemKeyboard) {
      setKeyboardVisible(false);
    } else {
      setKeyboardVisible(true);
    }
  };

  const handleKeyboardClose = () => {
    setKeyboardVisible(false);
    setSystemKeyboard(false);
    Keyboard.dismiss();
  };

  const handleUseSystemKeyboard = () => {
    setSystemKeyboard(true);
    setKeyboardVisible(false);
    textInputRef.current?.focus();
  };

  const handlePress = (key: string) => {
    if (key === DELETE) {
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

  const handleLongPress = (key: string) => {
    if (key === DELETE) {
      setInputValue('');
    }
  };

  const renderKeyboardButton = (key: string, rowNumber: number) =>
    key ? (
      <TouchableOpacity
        key={key + randomString()}
        style={[
          styles.keyButton,
          {
            width: Dimensions.get('window').width / rowNumber - 2,
          },
        ]}
        onPress={() => key && handlePress(key)}
        onLongPress={() => key && handleLongPress(key)}>
        <Text style={styles.keyText}>{key}</Text>
      </TouchableOpacity>
    ) : (
      <View
        key={key + randomString()}
        style={{
          width: Dimensions.get('window').width / rowNumber - 2,
        }}
      />
    );

  const copyOrPaste = async (type: 'copy' | 'paste') => {
    if (type === 'copy') {
      Clipboard.setString(inputValue);
    } else {
      const text = await Clipboard.getString();
      handlePress(text);
    }
  };

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
        showSoftInputOnFocus={systemKeyboard}
        onSelectionChange={({ nativeEvent: { selection } }) =>
          setCursorPos(selection.start)
        }
        onChangeText={setInputValue}
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
          <View style={styles.keyboardRow}>
            <View style={styles.keyboardControlRow}>
              <TouchableOpacity onPress={handleUseSystemKeyboard}>
                <Text style={styles.keyboardControlLabel}>
                  {t('component.textInputCustom.systemKeyboard.label')}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.keyboardControlRow}>
              <TouchableOpacity onPress={() => copyOrPaste('copy')}>
                <Text style={styles.keyboardControlLabel}>
                  {t('component.textInputCustom.copy.label')}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => copyOrPaste('paste')}>
                <Text style={styles.keyboardControlLabel}>
                  {t('component.textInputCustom.paste.label')}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
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
    backgroundColor: commonStyles.color.white,
    borderRadius: commonStyles.radius.small,
    height: 50,
    justifyContent: 'center',
    marginBottom: commonStyles.spacings.small3X,
    textAlign: 'center',
  },
  keyText: {
    ...commonStyles.textSize.h2,
    fontWeight: 'bold',
  },
  keyboard: {
    alignItems: 'center',
    backgroundColor: commonStyles.backgroundColor.info,
    bottom: commonStyles.spacings.none,
    justifyContent: 'center',
    paddingBottom: commonStyles.spacings.large,
    position: 'absolute',
    width: '100%',
  },
  keyboardControlLabel: {
    color: commonStyles.textColor.primary,
    paddingHorizontal: commonStyles.spacings.medium,
  },
  keyboardControlRow: {
    flexDirection: 'row',
    paddingVertical: commonStyles.spacings.small,
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
    margin: commonStyles.spacings.none,
    padding: commonStyles.spacings.none,
  },
});
