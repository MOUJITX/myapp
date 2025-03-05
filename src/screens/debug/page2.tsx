import React from 'react';
import Button from '../../components/basic/Button';
import { Text, TextInput } from 'react-native';
import { request } from '../../utils/request';
import { pubApiUrl_barcode } from '../../environment';

export const PageB = () => {
  const [text, setText] = React.useState('6923326889170');
  const [res, setRes] = React.useState('');
  const handleButtonPress = () => {
    request('get', pubApiUrl_barcode(text))
      .then(res => {
        console.log('api test', res);
        setRes(JSON.stringify(res));
      })
      .catch(err => {
        console.error('api test error', err);
      });
  };

  return (
    <>
      <Button onPress={handleButtonPress} />
      <TextInput onChangeText={setText}>{text}</TextInput>
      <Text>{res}</Text>
    </>
  );
};
