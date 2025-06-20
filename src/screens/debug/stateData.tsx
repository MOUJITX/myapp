import { ScrollView, View } from 'react-native';

import CellGroup from '../../components/basic/CellGroup';
import HoverButton from '../../components/basic/HoverButton';
import TextLabel from '../../components/basic/TextLabel';
import { flex1 } from '../../styles';

import { useDebugHook } from './debugHook';

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
