import React from 'react';
import { View, Text, Button } from 'react-native';
import { usePage1Hook } from './page1Hook';
import { useTranslation } from 'react-i18next';
import * as RNLocalize from 'react-native-localize';

export const PageA = () => {
  const { t } = useTranslation();
  const {
    input: { isLogin, loginUser },
    output: { login, logout },
  } = usePage1Hook();

  const lang = RNLocalize.getLocales();
  console.warn('lang', JSON.stringify(lang));

  return (
    <View>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Button title="login" onPress={login} />
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Button title="logout" onPress={logout} />
      <Text>isLogin: {isLogin ? 'true' : 'false'}</Text>
      <Text>loginUser: {loginUser ?? 'none'}</Text>
      <Text>page 1</Text>
      <Text>page 1</Text>
      <Text>local language: {}</Text>
      <Text>{t('welcome')}</Text>
      <Text>{t('description')}</Text>
      <Text>{t('del.del')}</Text>
    </View>
  );
};
