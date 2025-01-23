import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { useLoginHook } from './loginHook';
import TextInput from '../../../components/basic/TextInput';
import CellGroup from '../../../components/basic/CellGroup';
import Button from '../../../components/basic/Button';
import { t } from 'i18next';
import SpacingView from '../../../components/basic/SpacingView';

export const LoginScreen = () => {
  const {
    input: {},
    output: { handleLogin },
  } = useLoginHook();

  const [username, setUsername] = useState('');
  const [isUsername, setIsUsername] = useState<boolean>(true);
  const [password, setPassword] = useState('');
  const [isPassword, setIsPassword] = useState<boolean>(true);

  const checkUsername = () => {
    username ? setIsUsername(true) : setIsUsername(false);
  };

  const checkPassword = () => {
    password ? setIsPassword(true) : setIsPassword(false);
  };

  const checkLogin = () => {
    checkUsername();
    checkPassword();
    if (isUsername && isPassword) {
      handleLogin({ username, password });
    }
  };

  return (
    <View>
      <SpacingView>
        <Text>{t('userProfile.login.title')}</Text>
        <CellGroup card>
          <TextInput
            required
            label={t('userProfile.login.username.label')}
            placeholder={t('userProfile.login.username.placeholder')}
            onValueChange={value => {
              setUsername(value);
              checkUsername();
            }}
            info={isUsername ? '' : t('userProfile.login.username.info.empty')}
            infoType="danger"
            onBlur={checkUsername}
          />
          <TextInput
            required
            label={t('userProfile.login.password.label')}
            placeholder={t('userProfile.login.password.placeholder')}
            onValueChange={value => {
              setPassword(value);
              checkPassword();
            }}
            type="password"
            info={isPassword ? '' : t('userProfile.login.password.info.empty')}
            infoType="danger"
            onBlur={checkPassword}
          />
          <Button
            plain
            onPress={checkLogin}
            label={t('userProfile.login.button.login')}
          />
        </CellGroup>
      </SpacingView>
    </View>
  );
};
