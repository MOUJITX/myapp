import React, { useState } from 'react';
import { Image, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { commonStyles, ImageSize } from '../../styles';

export interface Props {
  img: string;
  size: ImageSize;
  radius?: boolean;
  onPress?: () => void;
  preview?: boolean;
}

export default (props: Props) => {
  const [visible, setVisible] = useState(false);

  const handlePress = () => {
    if (props.onPress) {
      props.onPress();
    } else {
      setVisible(true);
    }
  };

  return (
    <>
      <TouchableOpacity
        onPress={handlePress}
        disabled={!props.onPress && !props.preview}
      >
        <Image
          source={{ uri: props.img }}
          style={{
            width: commonStyles.imageSize[props.size],
            height: commonStyles.imageSize[props.size],
            borderRadius: props.radius ? commonStyles.radius.medium : undefined,
          }}
        />
      </TouchableOpacity>

      <Modal
        transparent
        statusBarTranslucent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={styles.modalBackdrop}
        >
          <Image
            source={{ uri: props.img }}
            style={[styles.fullScreenImage]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullScreenImage: {
    width: '100%',
    height: '100%',
  },
});
