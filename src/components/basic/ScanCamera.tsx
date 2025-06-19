import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Camera,
  CodeType,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

import HoverButton from './HoverButton';
import Popup from './Popup';

export enum CodeScanFailedType {
  NO_PERMISSION = 'NO_PERMISSION',
  NO_DEVICE = 'NO_DEVICE',
  USER_CANCEL = 'USER_CANCEL',
}

interface Props {
  codeType: CodeType;
  onCodeScanSuccess: (value: string) => void;
  onCodeScanFailed?: (error: CodeScanFailedType) => void;
}

export default (props: Props) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const [checked, setChecked] = useState<boolean | undefined>(undefined);
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    requestPermission();
    setChecked(hasPermission);
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: [props.codeType],
    onCodeScanned: codes => {
      setIsActive(false);

      props.onCodeScanSuccess(codes[0].value ?? '');
    },
  });

  return (
    <View>
      {!device && (
        <Popup
          visible={!device}
          title={t('component.camera.noDevice.title')}
          content={t('component.camera.noDevice.message')}
          buttons={[
            {
              label: t('common.return.label'),
              onPress: () => {
                props.onCodeScanFailed &&
                  props.onCodeScanFailed(CodeScanFailedType.NO_DEVICE);
                setIsActive(false);
              },
              type: 'danger',
            },
          ]}
        />
      )}
      {checked === false && (
        <Popup
          visible={!checked}
          title={t('component.camera.noPermission.title')}
          content={t('component.camera.noPermission.message')}
          buttons={[
            {
              label: t('common.return.label'),
              onPress: () => {
                props.onCodeScanFailed &&
                  props.onCodeScanFailed(CodeScanFailedType.NO_PERMISSION);
                setIsActive(false);
              },
              type: 'danger',
            },
          ]}
        />
      )}
      {device && checked && isActive && (
        <View>
          <Camera
            style={styles.camera}
            device={device}
            isActive={isActive}
            codeScanner={codeScanner}
          />
          <HoverButton
            label={t('common.close.icon')}
            onPress={() => {
              props.onCodeScanFailed &&
                props.onCodeScanFailed(CodeScanFailedType.USER_CANCEL);
              setIsActive(false);
            }}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    height: '100%',
    width: '100%',
  },
});
