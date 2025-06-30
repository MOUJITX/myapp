import { t } from 'i18next';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';

import { commonStyles } from '../../styles';

import { Props as CellProps } from './Cell';
import Cell from './Cell';

interface Props extends CellProps, TextInputProps {
  value?: string;
  textLines?: number;
  placeholder?: string;
  type?: 'text' | 'number' | 'password';
  onValueChange: (value: string) => void;
}

export default (props: Props) => {
  const handleTextInput = (value: string) => {
    let newValue = value;

    if (props.type === 'number') {
      newValue = value.replace(/[^0-9]/g, '');
    }

    props.onValueChange(newValue);
  };

  return (
    <Cell {...props}>
      <TextInput
        style={styles.textInput}
        multiline={!!props.textLines && props.textLines > 1}
        numberOfLines={props.textLines}
        placeholder={props.placeholder ?? t('component.textInput.placeholder')}
        placeholderTextColor={commonStyles.textColor.info}
        value={props.value}
        onChangeText={handleTextInput}
        keyboardType={props.type === 'number' ? 'numeric' : 'default'}
        secureTextEntry={props.type === 'password'}
        {...props}
      />
    </Cell>
  );
};

const styles = StyleSheet.create({
  textInput: {
    color: commonStyles.textColor.default,
    flexShrink: 1,
    margin: 0,
    padding: 0,
  },
});
