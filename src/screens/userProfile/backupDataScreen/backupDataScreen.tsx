import React from 'react';
import SpacingView from '../../../components/basic/SpacingView';
import CellGroup from '../../../components/basic/CellGroup';
import TextLabel from '../../../components/basic/TextLabel';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { useBackupDataHook } from './backupDataHook';
import { t } from 'i18next';

export const BackupDataScreen = () => {
  const {
    input: { allStateData },
    output: {},
  } = useBackupDataHook();

  const handleBackup = async () => {
    try {
      const jsonData = JSON.stringify(allStateData, null, 2);
      const filePath = `${RNFS.DocumentDirectoryPath}/backup.json`;
      await RNFS.writeFile(filePath, jsonData, 'utf8');
      await Share.open({
        url: `file://${filePath}`,
        type: 'application/json',
        title: t('userProfile.backup.popup.title'),
      });
    } catch (error) {
      console.error('备份失败:', error);
    }
  };

  return (
    <SpacingView>
      <CellGroup card onPress={handleBackup}>
        <TextLabel
          label={t('userProfile.backup.backup.label')}
          labelSize="h3"
          value={t('userProfile.backup.backup.content')}
        />
      </CellGroup>
      <CellGroup card onPress={() => console.log('restore')}>
        <TextLabel
          label={t('userProfile.backup.restore.label')}
          labelSize="h3"
          value={t('userProfile.backup.restore.content')}
        />
      </CellGroup>
    </SpacingView>
  );
};
