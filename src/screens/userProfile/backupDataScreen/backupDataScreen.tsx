import React, { useState } from 'react';
import SpacingView from '../../../components/basic/SpacingView';
import CellGroup from '../../../components/basic/CellGroup';
import TextLabel from '../../../components/basic/TextLabel';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import { useBackupDataHook } from './backupDataHook';
import { t } from 'i18next';
import Popup from '../../../components/basic/Popup';
import FilePicker from '../../../components/basic/FilePicker';
import { types } from '@react-native-documents/picker';

export const BackupDataScreen = () => {
  const {
    input: { allStateData },
    output: { restoreData, logout },
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

  const [restorePopup, setRestorePopup] = useState(false);

  const handleRestore = async (data: string) => {
    restoreData(data);
    setRestorePopup(true);
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
      <FilePicker fileTypes={[types.json]} onFileRead={handleRestore}>
        <CellGroup card>
          <TextLabel
            label={t('userProfile.backup.restore.label')}
            labelSize="h3"
            value={t('userProfile.backup.restore.content')}
          />
        </CellGroup>
      </FilePicker>
      <Popup
        visible={restorePopup}
        title={t('userProfile.backup.restore.success.label')}
        content={t('userProfile.backup.restore.success.content')}
        buttons={[
          {
            label: t('userProfile.backup.restore.success.reLogin'),
            onPress: logout,
            type: 'default',
          },
        ]}
      />
    </SpacingView>
  );
};
