import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Camera,
  useCodeScanner,
  useCameraPermission,
  useCameraDevice,
  CodeType,
} from 'react-native-vision-camera';
import Button from './Button';
import HoverButton from './HoverButton';

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
        <View>
          <Text>未获取设备</Text>
          <Button
            onPress={() =>
              props.onCodeScanFailed &&
              props.onCodeScanFailed(CodeScanFailedType.NO_DEVICE)
            }
            label="返回"
          />
        </View>
      )}
      {!checked && (
        <View>
          <Text>未获取权限</Text>
          <Button
            onPress={() =>
              props.onCodeScanFailed &&
              props.onCodeScanFailed(CodeScanFailedType.NO_PERMISSION)
            }
            label="返回"
          />
        </View>
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
