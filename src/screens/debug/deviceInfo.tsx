import { ScrollView, View } from 'react-native';

import CellGroup from '../../components/basic/CellGroup';
import HoverButton from '../../components/basic/HoverButton';
import TextLabel from '../../components/basic/TextLabel';
import { languageCode, languageTag } from '../../i18n/i18n';
import { flex1 } from '../../styles';

import { useDebugHook } from './debugHook';

export const DeviceInfo = () => {
  const {
    input: { isLogin, loginUser, loginUsername, envInfo },
    output: { logout },
  } = useDebugHook();

  return (
    <View style={flex1}>
      <ScrollView>
        <CellGroup>
          <TextLabel label="os" value={envInfo.os} inline />
          <TextLabel label="version" value={envInfo.osVersion} inline />
          <TextLabel label="env" value={envInfo.env} inline />
          <TextLabel
            label="isDev"
            value={envInfo.isDev ? 'true' : 'false'}
            inline
          />
          <TextLabel label="deviceBrand" value={envInfo.deviceBrand} inline />
          <TextLabel label="deviceModel" value={envInfo.deviceModel} inline />
          <TextLabel label="languageCode" value={languageCode} inline />
          <TextLabel label="languageTag" value={languageTag} inline />
        </CellGroup>
        <CellGroup>
          <TextLabel
            label="isLogin"
            value={isLogin ? 'true' : 'false'}
            inline
          />
          {isLogin && (
            <>
              <TextLabel label="userID" value={loginUser} inline />
              <TextLabel label="username" value={loginUsername} inline />
            </>
          )}
        </CellGroup>
      </ScrollView>
      {isLogin && <HoverButton onPress={logout} label="[=" />}
    </View>
  );
};
