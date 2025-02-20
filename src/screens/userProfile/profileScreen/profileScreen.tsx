import React from 'react';
import { ScrollView } from 'react-native';
import CellGroup from '../../../components/basic/CellGroup';
import Divider from '../../../components/basic/Divider';
import CellButton from '../../../components/basic/CellButton';
import { useProfileHook } from './profileHook';

export default () => {
  const {
    input: {},
    output: { logout, gotoBackupScreen },
  } = useProfileHook();
  return (
    <ScrollView>
      <CellGroup title="设置">
        <CellButton label="通用设置" />
        <Divider />
        <CellButton label="系统权限" />
      </CellGroup>
      <CellGroup>
        <CellButton label="数据备份与恢复" onPress={gotoBackupScreen} />
      </CellGroup>
      <CellGroup>
        <CellButton label="切换账号" />
        <Divider />
        <CellButton label="退出" onPress={logout} />
      </CellGroup>
    </ScrollView>
  );
};
