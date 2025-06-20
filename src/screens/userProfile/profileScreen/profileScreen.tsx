import { t } from 'i18next';
import { ScrollView } from 'react-native';

import CellButton from '../../../components/basic/CellButton';
import CellGroup from '../../../components/basic/CellGroup';
import Divider from '../../../components/basic/Divider';

import { useProfileHook } from './profileHook';

export default () => {
  const {
    output: {
      logout,
      gotoBackupScreen,
      gotoDeviceInfoScreen,
      gotoStateDataScreen,
      gotoPage2,
      gotoPage3,
    },
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
      {__DEV__ && (
        <CellGroup title="debug">
          <CellButton
            label={'DeviceInfo Screen'}
            onPress={gotoDeviceInfoScreen}
          />
          <Divider />
          <CellButton
            label={'StateData Screen'}
            onPress={gotoStateDataScreen}
          />
          <Divider />
          <CellButton label={'Test Screen B'} onPress={gotoPage2} />
          <Divider />
          <CellButton label={'Test Screen C'} onPress={gotoPage3} />
        </CellGroup>
      )}
    </ScrollView>
  );
};
