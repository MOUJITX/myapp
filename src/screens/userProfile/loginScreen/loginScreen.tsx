import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useLoginHook } from './loginHook';
import TextInput from '../../../components/basic/TextInput';

export const LoginScreen = () => {
  const { t } = useTranslation();
  const {} = useLoginHook();

  return (
    <View>
      <Text>{t('userProfile.login.title')}</Text>
      <TextInput />
      <TextInput />
    </View>
  );
};
