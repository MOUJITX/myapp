import React from 'react';
import { ScrollView, View } from 'react-native';
import { useDebugHook } from './debugHook';
import CellGroup from '../../components/basic/CellGroup';
import TextLabel from '../../components/basic/TextLabel';
import HoverButton from '../../components/basic/HoverButton';
import { flex1 } from '../../styles';

export const StateData = () => {
  const {
    input: { isLogin, loginUser, loginUsername, allState },
    output: { logout },
  } = useDebugHook();

  return (
    <View style={flex1}>
      <ScrollView>
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
          <TextLabel label="stateTree" value={allState} />
        </CellGroup>
      </ScrollView>
      {isLogin && <HoverButton onPress={logout} label="[=" />}
    </View>
  );
};
