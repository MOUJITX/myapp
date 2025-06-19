import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { CodeType } from 'react-native-vision-camera';

import Button, { ButtonShapeType } from './Button';
import ScanCamera from './ScanCamera';


interface Props {
  onSuccess: (value: string) => void;
  codeType: CodeType;
}

export default (props: Props) => {
  const [visible, setVisible] = useState(false);

  const handleOpenCamera = () => {
    // console.log('Open Camera');
    setVisible(true);
  };

  return (
    <View>
      <Button
        shape={ButtonShapeType.Square}
        size="small"
        type="default"
        plain
        label="><"
        onPress={handleOpenCamera}
      />
      <Modal
        transparent
        statusBarTranslucent
        visible={visible}
        onRequestClose={() => setVisible(false)}>
        <TouchableWithoutFeedback style={styles.modalBackdrop}>
          <View>
            <ScanCamera
              onCodeScanSuccess={value => {
                // console.log('Scan Success', value);
                setVisible(false);
                props.onSuccess(value);
              }}
              onCodeScanFailed={error => {
                console.error('Scan Failed', error);
                setVisible(false);
              }}
              codeType={props.codeType}
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    height: '100%',
    width: '100%',
  },
});
