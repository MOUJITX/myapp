import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import React, { useEffect, useState } from 'react';
import { Keyboard, Platform, StyleSheet, Text } from 'react-native';

import { languageTag } from '../../i18n/i18n';
import { commonStyles } from '../../styles';

import { Props as CellProps } from './Cell';
import Cell from './Cell';

interface Props extends CellProps {
  value?: Date;
  mode?: 'date' | 'time';
  maxDate?: Date;
  minDate?: Date;
  onValueChange: (value: Date) => void;
}

export default (props: Props) => {
  const [date, setDate] = useState<Date>(props.value ?? new Date());
  const [show, setShow] = useState<Boolean>(false);

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
            ? new Date(date).toLocaleTimeString()
            : new Date(date).toLocaleDateString()}
        </Text>
      )}
      {show && (
        <DateTimePicker
          locale={languageTag}
          value={new Date(date)}
          mode={props.mode ?? 'date'}
          is24Hour={true}
          display="default"
          onChange={onChange}
          maximumDate={props.maxDate && new Date(props.maxDate)}
          minimumDate={props.minDate && new Date(props.minDate)}
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
