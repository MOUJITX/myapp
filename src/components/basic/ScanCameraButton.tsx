import React, { useState } from 'react';
import Button, { ButtonShapeType } from './Button';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ScanCamera from './ScanCamera';

export default () => {
  const [visible, setVisible] = useState(false);

  const handleOpenCamera = () => {
    console.log('Open Camera');
    setVisible(true);
  };

  return (
    <View>
      <Button
        shape={ButtonShapeType.Square}
        size="small"
        type="default"
        label="><"
        onPress={handleOpenCamera}
      />
      <Modal
        transparent
        statusBarTranslucent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableWithoutFeedback style={styles.modalBackdrop}>
          <View>
            <ScanCamera
              onCodeScanSuccess={value => {
                console.log('Scan Success', value);
                setVisible(false);
              }}
              onCodeScanFailed={error => {
                console.log('Scan Failed', error);
                setVisible(false);
              }}
              codeType="ean-13"
            />
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    width: '100%',
    height: '100%',
  },
});
