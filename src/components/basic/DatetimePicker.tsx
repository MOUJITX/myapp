import React, { useEffect, useState } from 'react';
import { Props as CellProps } from './Cell';
import { Keyboard, Platform, StyleSheet, Text } from 'react-native';
import Cell from './Cell';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { commonStyles } from '../../styles';
import { languageTag } from '../../i18n/i18n';

interface Props extends CellProps {
  value?: Date;
  mode?: 'date' | 'time';
  maxDate?: Date;
  minDate?: Date;
  onValueChange: (value: Date) => void;
}

export default (props: Props) => {
  const [date, setDate] = useState(props.value ?? new Date());
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDate(props.value ?? new Date());
  }, [props.value]);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
    props.onValueChange(currentDate);
  };

  const showPicker = () => {
    Keyboard.dismiss();
    setShow(true);
  };

  return (
    <Cell {...props}>
      {(!show || Platform.OS === 'android') && (
        <Text onPress={showPicker} style={styles.dateTimeText}>
          {props.mode === 'time'
            ? date.toLocaleTimeString()
            : date.toLocaleDateString()}
        </Text>
      )}
      {show && (
        <DateTimePicker
          locale={languageTag}
          value={date}
          mode={props.mode ?? 'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={props.maxDate}
          minimumDate={props.minDate}
        />
      )}
    </Cell>
  );
};

const styles = StyleSheet.create({
  dateTimeText: {
    color: commonStyles.color.blue,
  },
});
