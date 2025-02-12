import React, { useState } from 'react';
import Button, { ButtonShapeType } from './Button';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ScanCamera from './ScanCamera';

interface Props {
  onSuccess: (value: string) => void;
}

export default (props: Props) => {
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
        plain
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
                props.onSuccess(value);
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
