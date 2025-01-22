import React from 'react';
import { ScrollView } from 'react-native';
import { useDebugHook } from './debugHook';
import CellGroup from '../../components/basic/CellGroup';
import TextLabel from '../../components/basic/TextLabel';
import { languageCode, languageTag } from '../../i18n/i18n';

export const DebugScreen = () => {
  const {
    input: { isLogin, loginUser, loginUsername, allState, envInfo },
    output: {},
  } = useDebugHook();

  return (
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
        <TextLabel label="isLogin" value={isLogin ? 'true' : 'false'} inline />
        {isLogin && (
          <>
            <TextLabel label="userID" value={loginUser} inline />
            <TextLabel label="username" value={loginUsername} inline />
          </>
        )}
        <TextLabel label="stateTree" value={allState} />
      </CellGroup>
    </ScrollView>
  );
};
