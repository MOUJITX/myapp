import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { AppNavigationList } from './navigation/AppNavigationList';
import { StackScreenProps } from '@react-navigation/stack';
import Popup from './components/basic/Popup';
import Button from './components/basic/Button';

type Props = StackScreenProps<AppNavigationList, 'PageC'>;

export const PageC = (props: Props) => {
  const initMsg = props.route.params.initMsg;
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Text>page 3</Text>
      <Text>{initMsg}</Text>
      <Button label="show popup" onPress={() => setVisible(true)} />
      <Popup
        visible={visible}
        title="权限申请"
        content={
          '在设置-应用-微信-权限中开启相机权限，以正常使用拍摄、小视频、扫一扫等功能'
        }
        buttonsInline
        buttons={[
          {
            label: '取消',
            onPress: () => setVisible(false),
            type: 'danger',
          },
          {
            label: '取消1',
            onPress: () => setVisible(false),
            type: 'default',
          },
        ]}
      />
    </View>
  );
};
