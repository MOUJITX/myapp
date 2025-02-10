import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  Camera,
  useCodeScanner,
  useCameraPermission,
  useCameraDevice,
  CodeType,
} from 'react-native-vision-camera';

interface Props {
  codeType: CodeType;
  onCodeScanSuccess: (value: string) => void;
}

export default (props: Props) => {
  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  const [checked, setChecked] = useState(false);
  const [isActive, setIsActive] = useState(true);

  const [code, setCode] = useState('');

  useEffect(() => {
    requestPermission();
    setChecked(hasPermission);
  }, [hasPermission, requestPermission]);

  const codeScanner = useCodeScanner({
    codeTypes: [props.codeType],
    onCodeScanned: codes => {
      // console.log('codes', codes);
      setCode(codes[0].value ?? '');
      setIsActive(false);

      props.onCodeScanSuccess(codes[0].value ?? '');
    },
  });

  return (
    <View>
      {!device && <Text>未获取设备</Text>}
      {!checked && <Text>未获取权限</Text>}
      {device && checked && isActive && (
        <Camera
          style={styles.camera}
          device={device}
          isActive={isActive}
          codeScanner={codeScanner}
        />
      )}
      {code && <Text>code: {code}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: 200,
  },
});
