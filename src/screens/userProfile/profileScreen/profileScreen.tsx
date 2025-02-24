import React from 'react';
import { ScrollView } from 'react-native';
import CellGroup from '../../../components/basic/CellGroup';
import Divider from '../../../components/basic/Divider';
import CellButton from '../../../components/basic/CellButton';
import { useProfileHook } from './profileHook';
import { t } from 'i18next';

export default () => {
  const {
    input: {},
    output: { logout, gotoBackupScreen },
  } = useProfileHook();
  return (
    <ScrollView>
      <CellGroup title={t('userProfile.menu.settings.title.label')}>
        <CellButton label={t('userProfile.menu.settings.general.label')} />
        <Divider />
        <CellButton label={t('userProfile.menu.settings.permission.label')} />
      </CellGroup>
      <CellGroup>
        <CellButton
          label={t('userProfile.menu.backup.label')}
          onPress={gotoBackupScreen}
        />
      </CellGroup>
      <CellGroup>
        <CellButton label={t('userProfile.menu.exit.exchange.label')} />
        <Divider />
        <CellButton
          label={t('userProfile.menu.exit.exit.label')}
          onPress={logout}
        />
      </CellGroup>
    </ScrollView>
  );
};
