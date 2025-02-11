import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Camera,
  useCodeScanner,
  useCameraPermission,
  useCameraDevice,
  CodeType,
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

  const [checked, setChecked] = useState(false);
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
          title="摄像头打开失败"
          content={'无法打开摄像头，请检查设备是否正常'}
          buttons={[
            {
              label: '返回',
              onPress: () =>
                props.onCodeScanFailed &&
                props.onCodeScanFailed(CodeScanFailedType.NO_DEVICE),
              type: 'danger',
            },
          ]}
        />
      )}
      {!checked && (
        <Popup
          visible={!checked}
          title="获取权限失败"
          content={'当前功能需要开启相机权限'}
          buttons={[
            {
              label: '返回',
              onPress: () =>
                props.onCodeScanFailed &&
                props.onCodeScanFailed(CodeScanFailedType.NO_PERMISSION),
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
            label="×"
            onPress={() =>
              props.onCodeScanFailed &&
              props.onCodeScanFailed(CodeScanFailedType.USER_CANCEL)
            }
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
  },
});
