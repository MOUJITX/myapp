import React from 'react';
import { ScrollView } from 'react-native';
import CellGroup from '../../../components/basic/CellGroup';
import Divider from '../../../components/basic/Divider';
import CellButton from '../../../components/basic/CellButton';

export default () => {
  return (
    <ScrollView>
      <CellGroup>
        <CellButton label="通用设置" />
        <Divider />
        <CellButton label="系统权限" />
      </CellGroup>
      <CellGroup>
        <CellButton label="导出/备份数据" />
        <Divider />
        <CellButton label="恢复数据" />
      </CellGroup>
      <CellGroup>
        <CellButton label="切换账号" />
        <Divider />
        <CellButton label="退出" />
      </CellGroup>
    </ScrollView>
  );
};
