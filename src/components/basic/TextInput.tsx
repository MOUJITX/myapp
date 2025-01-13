import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

export default () => {
  return <TextInput style={styles.textInput} multiline />;
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
  },
});
